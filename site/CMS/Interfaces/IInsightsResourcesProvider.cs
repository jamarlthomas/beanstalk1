using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Interfaces
{
    public interface IInsightsResourcesProvider
    {
        InsightsResources GetInsightsResourcesPage();
        string GetInsightsResourcesPageTitle();
        InsightsResources GetInsightsResourcesByName(string name);
    }
}