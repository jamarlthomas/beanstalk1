using System.Collections.Generic;
using System.Data;
using System.Linq;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Models.Afton.Shared.Personalization;
using CMS.OnlineMarketing;
using CMS.Personas;
using CMS.SiteProvider;
using CMS.WebAnalytics;
using System;

namespace CMS.Mvc.Providers
{
    public class PersonalizationProvider : IPersonalizationProvider
    {
        private const int WeightsSum = 3;
        private const double AgeSortWeight = 1;
        private const double ViewsSortWeight = 1;
        private const double PointsSortWeight = 1;
        public PersonaInfo CurrentPersona { get; set; }
        public ContactInfo CurrentContact { get; set; }
        public List<PersonalizedContent<PersonalizedTile>> ContentList { get; set; }
        public List<PersonalizedTile> GetPersonalizedItems()
        {
            GetPersona();
            GetAllContent();

            if (CurrentPersona == null)
            {
                GetDefaultRecommendedContent();
                return ContentList
                    .Select(item => item.Item)
                    .ToList();
            }

            GetLastDateTheVisitorViewedEachPieceOfContent();
            GetPostedDateOfAllTheContent();
            GetPointsAssignedForThePersonaForAllTheContent();
            GetNumberOfViewsOfAllTheContent();

            ExcludeViewedRecentlyContent(48);
            SortContentFromNewToOld();
            SortContentWeightedHigherForPersona();
            SortPopularContentBeforeStagnant();

            if (ContentList.Count < 3)
            {
                PickDefaultsForCurrentPersona();
            }

            var result = ContentList
                .OrderBy(item => item.Relevance)
                .Select(item => item.Item)
                .ToList();

            return result;

        }

        private void PickDefaultsForCurrentPersona()
        {
            var personaDefaults = ContentHelper.GetDocs<PersonalizedContentModel>(new PersonalizedContentModel().ClassName).FirstOrDefault(item => item.Persona.Equals(CurrentPersona.PersonaDisplayName));
            if (personaDefaults != null)
            {
                GetDefaultItems(personaDefaults);
            }
        }

        private void GetDefaultItems(PersonalizedContentModel personaDefaults)
        {
            var defaultItems =
                ContentHelper.GetDocsByGuids<TreeNode>(UtilsHelper.ParseGuids(personaDefaults.Documents));
            defaultItems.ForEach(item =>
            {
                var pt = new PersonalizedTile();
                pt.Load(item);
                ContentList.Add(new PersonalizedContent<PersonalizedTile>(pt));
            });
        }


        private void GetDefaultRecommendedContent()
        {
            var defaults = ContentHelper.GetDocs<PersonalizedContentModel>(new PersonalizedContentModel().ClassName).FirstOrDefault(item => item.Default);
            if (defaults != null)
            {
                GetDefaultItems(defaults);
            }
        }


        private void GetAllContent()
        {
            ContentList = ContentHelper.GetDocsOfTypes(AftonData.PersonalizationTypes).Select(item => new PersonalizedContent<PersonalizedTile>(item)).ToList();
        }




        private void SortPopularContentBeforeStagnant()
        {
            var sortedByViews = ContentList.OrderByDescending(item => item.ViewsCount).ToList();
            sortedByViews.ForEach(item =>
            {
                item.IndexSum += (sortedByViews.IndexOf(item) * ViewsSortWeight) / (sortedByViews.Count * WeightsSum);
            });
        }


        private void SortContentWeightedHigherForPersona()
        {
            var sortedByPoints = ContentList.OrderBy(item => item.CurrentPersonaWeight).ToList();
            sortedByPoints.ForEach(item =>
            {
                item.IndexSum += (sortedByPoints.IndexOf(item) * PointsSortWeight) / (sortedByPoints.Count * WeightsSum);
            });
        }

        private int GetWeight(int nodeId)
        {
            var rule = RuleInfoProvider.GetRules().FirstOrDefault(r => r.RuleCondition.Contains(string.Format("[ActivityNodeID] = {0}", nodeId)));
            return (rule == null) ? default(int) : rule.RuleValue;
        }

        private void SortContentFromNewToOld()
        {
            var sortedByDate = ContentList.OrderBy(item => item.PostedDate).ToList();
            sortedByDate.ForEach(item =>
            {
                item.IndexSum += (sortedByDate.IndexOf(item) * AgeSortWeight) / (sortedByDate.Count * WeightsSum);
            });


        }

        private void ExcludeViewedRecentlyContent(int hours)
        {
            ContentList = ContentList.Where(item => item.LastViewDate < DateTime.Now.AddHours((-1) * hours)).ToList();
        }

        private void GetLastDateTheVisitorViewedEachPieceOfContent()
        {
            ContentList.ForEach(ci =>
            {
                ci.LastViewDate =
                    ActivityInfoProvider
                        .GetActivities()
                        .Where(item =>
                            item.ActivityNodeID == ci.Item.NodeID &&
                            item.ActivityActiveContactID == CurrentContact.ContactID &&
                            item.ActivityType == PredefinedActivityType.PAGE_VISIT)
                        .OrderByDescending(ac => ac.ActivityCreated)
                        .Select(it => it.ActivityCreated)
                        .FirstOrDefault();
            });

        }

        private void GetPointsAssignedForThePersonaForAllTheContent()
        {
            ContentList.ForEach(item =>
            {
                item.CurrentPersonaWeight = GetWeight(item.Item.NodeID);
            });
        }

        private void GetNumberOfViewsOfAllTheContent()
        {
            //ContentList.ForEach(item => item.ViewsCount = HitsInfoProvider.GetObjectHitCount(SiteContext.CurrentSiteID, item.Item.NodeID, HitsIntervalEnum.Hour, HitLogProvider.PAGE_VIEWS, new DateTime(1753, 1, 1), DateTime.Now));
            DataSet info = HitsInfoProvider.GetAllHitsInfo(SiteContext.CurrentSiteID, HitsIntervalEnum.Year,
                HitLogProvider.PAGE_VIEWS,
                DateTime.Now);

            ContentList.ForEach(item =>
            {
                int count = 0;
                foreach (DataRow row in info.Tables[0].Rows)
                {
                    if ((int)row["StatisticsObjectID"] == item.Item.Item.NodeID)
                    {
                        count += (int)row["HitsCount"];
                    }
                }
                item.ViewsCount = count;
            });
        }

        private void GetPostedDateOfAllTheContent()
        {
            ContentList.ForEach(item => item.PostedDate = (DateTime)item.Item.Item.GetValue("DocumentModifiedWhen"));
        }

        private void GetPersona()
        {
            CurrentContact = OnlineMarketingContext.GetCurrentContact();
            CurrentPersona = (new PersonaService()).GetPersonaForContact(CurrentContact);
        }


        public string GetSectionTitle()
        {
            var settings = ContentHelper.GetDocs<PersonalizationSettings>(PersonalizationSettings.CLASS_NAME)
                .FirstOrDefault();
            return (settings == null) ? "" : settings.PersonalizationSectionTitle;
        }


        public List<PersonalizedTile> GetTrendingTiles()
        {
            var trendingContent = ContentList.OrderByDescending(item => item.ViewsCount);
            return  trendingContent.Select(tile => tile.Item).ToList();
        }
    }
}
