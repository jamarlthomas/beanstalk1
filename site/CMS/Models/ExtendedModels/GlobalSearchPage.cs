using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class GlobalSearchPage : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("GlobalSearch");
                return (rt != null) ? rt.Route : string.Format("/GlobalSearch/Index");
            }
        }
    }
}
