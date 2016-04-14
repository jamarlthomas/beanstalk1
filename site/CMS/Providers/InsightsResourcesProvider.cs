using System.Collections.Generic;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class InsightsResourcesProvider : IInsightsResourcesProvider
    {
        public InsightsResources GetInsightsResourcesPage()
        {
            return ContentHelper.GetDoc<InsightsResources>(InsightsResources.CLASS_NAME);
        }

        public string GetInsightsResourcesPageTitle()
        {
            return GetInsightsResourcesPage().Title;
        }

        public InsightsResources GetInsightsResourcesByName(string name)
        {
            return ContentHelper.GetDocByName<InsightsResources>(InsightsResources.CLASS_NAME, name);
        }
    }
}