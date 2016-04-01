using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Interfaces
{
    public interface IInsightsResourcesProvider
    {
        InsightsResources GetInsightsResourcesPage();
        InsightsResources GetInsightsResourcesByName(string name);
    }
}