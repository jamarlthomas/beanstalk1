using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class InsightsResources : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("Insights And Resources");
                return (rt != null) ? rt.Route : "/Insights-And-Resources";
            }
        }
    }
}