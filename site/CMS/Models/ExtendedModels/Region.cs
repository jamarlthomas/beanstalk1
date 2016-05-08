using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class Region : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("SalesOffice");
                return (rt != null)
                    ? rt.Route.Replace("{RegionName}", NodeAlias)
                    : string.Format("/SalesOffices/Index/{0}", NodeAlias);
            }
        }
    }
}
