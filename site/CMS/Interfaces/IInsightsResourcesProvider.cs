using System.Collections.Generic;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Interfaces
{
    public interface IInsightsResourcesProvider
    {
        List<InsightsResources> GetInsightsResources();
        InsightsResources GetInsightsResourcesByName(string name);
    }
}