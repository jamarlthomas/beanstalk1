using System.Collections.Generic;
using System.Linq;
using CMS.DataEngine;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Helpers.UniGraphConfig;
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
    public class PersonalizationProvider : IPersonalisationProvider
    {
        //private readonly string _className = (new T()).ClassName;
        private const int WeightsSum = 3;
        private const double AgeSortWeight = 1;
        private const double ViewsSortWeight = 1;
        private const double PointsSortWeight = 1;
        public PersonaInfo CurrentPersona { get; set; }
        public ContactInfo CurrentContact { get; set; }
        public List<PersonalizedContent<TreeNode>> ContentList { get; set; }
        public List<PersonalizedTile> GetPersonalizedItems()
        {
            GetPersona();
            GetAllContent();

            if (CurrentPersona == null)
            {
                GetDefaultRecommendedContent();
                return ContentList.Select(item => GetPersonalizedTile(item.Item)).ToList();
            }

            GetLastDateTheVisitorViewedEachPieceOfContent();
            GetPostedDateOfAllTheContent();
            GetPointsAssignedForThePersonaForAllTheContent();
            GetNumberOfViewsOfAllTheContent();

            ExcludeViewedRecentlyContent(48);
            SortContentFromNewToOld();
            SortContentWeightedHigherForPersona();
            SortPopularContentBeforeStagnant();

            var result = ContentList.OrderBy(item => item.Relevance).Select(item => GetPersonalizedTile(item.Item)).ToList();

            return result;

        }

        private PersonalizedTile GetPersonalizedTile(TreeNode item)
        {
            PersonalizedTile tile = new PersonalizedTile();
            tile.Load(item);
            return tile;
        }

        private void GetDefaultRecommendedContent()
        {
            var defaults = ContentHelper.GetDocs<PersonalizedContentModel>(new PersonalizedContentModel().ClassName).FirstOrDefault(item => item.Default);
            if (defaults != null)
            {
                PrioritizeDefaultContent(defaults);
            }
        }

        private void PrioritizeDefaultContent(PersonalizedContentModel defaults)
        {
            var a = new List<PersonalizedContent<TreeNode>>();
            var guids = UtilsHelper.ParseGuids(defaults.Documents);
            foreach (var guid in guids)
            {
                var defItem = ContentList.FirstOrDefault(item => item.Item.DocumentGUID == guid);
                if (defItem != null)
                {
                    a.Add(defItem);
                }
            }
            a.AddRange(ContentList.Where(item => !guids.Contains(item.Item.DocumentGUID)));
            ContentList = a;
        }

        private void GetAllContent()
        {
            ContentList = ContentHelper.GetDocs<TreeNode>("custom.Product").Select(item => new PersonalizedContent<TreeNode>(item)).ToList();
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
            ContentList.ForEach(item => item.ViewsCount = HitsInfoProvider.GetObjectHitCount(SiteContext.CurrentSiteID, item.Item.NodeID, HitsIntervalEnum.Year, HitLogProvider.PAGE_VIEWS, new DateTime(1753, 1, 1), new DateTime(9999, 1, 1)));
        }

        private void GetPostedDateOfAllTheContent()
        {
            //ContentList.ForEach(item => item.PostedDate = (DateTime) item.Item.GetValue("DocumentModifiedWhen"));
            ContentList.ForEach(item => item.PostedDate = item.Item.DocumentPublishFrom);
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
    }
}
