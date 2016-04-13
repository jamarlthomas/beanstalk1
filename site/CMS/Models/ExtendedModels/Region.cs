using CMS.Mvc.Helpers;

namespace CMS.DocumentEngine.Types
{
    public partial class Region
    {
        public override string DocumentNamePath
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
