using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
	public class InsightsResourcesProvider : IInsightsResourcesProvider
    {
        public List<InsightsResources> GetInsightsResources()
        {
			return ContentHelper.GetDocs<InsightsResources>(InsightsResources.CLASS_NAME);
        }
    }
}