using CMS.Mvc.Helpers;

namespace CMS.DocumentEngine.Types
{
    public partial class InsightsResources
    {
        public override string DocumentNamePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("Insights And Resources");
                return (rt != null) ? rt.Route : "/Insights-And-Resources";
            }
        }
    }
}