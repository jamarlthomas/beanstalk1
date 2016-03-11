using System.Collections.Generic;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class PersonalisationProvider<T> : IPersonalisationProvider<T> where T : new()
    {

        public List<T> GetPersonalizedItems()
        {
            ContentList = ContentHelper.GetPersonalizedContent<T>();

            GetPersona();
            GetPostedDateOfAllTheContent();
            GetNumberOfViewsOfAllTheContent();
            GetPointsAssignedForThePersonaForAllTheContent();
            GetLastDateTheVisitorViewedEachPieceOfContent();

            ExcludeViewedRecentlyContent(48);
            SortContentFromNewToOld();
            SortContentWeightedHigherForPersona();
            SortPopularContentBeforeStagnant();

            return ContentList;
        }

        public List<T> ContentList { get; set; }


        private void SortPopularContentBeforeStagnant()
        {

        }

        private void SortContentWeightedHigherForPersona()
        {
            throw new System.NotImplementedException();
        }

        private void SortContentFromNewToOld()
        {
            throw new System.NotImplementedException();
        }

        private void ExcludeViewedRecentlyContent(int i)
        {
            throw new System.NotImplementedException();
        }

        private void GetLastDateTheVisitorViewedEachPieceOfContent()
        {
            throw new System.NotImplementedException();
        }

        private void GetPointsAssignedForThePersonaForAllTheContent()
        {
            throw new System.NotImplementedException();
        }

        private void GetNumberOfViewsOfAllTheContent()
        {
            throw new System.NotImplementedException();
        }

        private void GetPostedDateOfAllTheContent()
        {
            throw new System.NotImplementedException();
        }

        private void GetPersona()
        {
            throw new System.NotImplementedException();
        }

    }
}
