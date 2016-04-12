using CMS.Mvc.Helpers;

namespace CMS.DocumentEngine.Types
{
    public partial class GlobalSearchPage
    {
        public override string DocumentNamePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("GlobalSearch");
                return (rt != null) ? rt.Route : string.Format("/GlobalSearch/Index");
            }
        }
    }
}
