using CMS.Mvc.Helpers;

namespace CMS.DocumentEngine.Types
{
    public partial class GenericPage
    {
        public override string DocumentNamePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("Generic");
                return (rt != null) ? rt.Route.Replace("{DocumentName}", this.NodeAlias) : string.Format("/Generic/{0}", this.NodeAlias);
                //return string.Format("/GenericPage/Index/{0}", this.NodeAlias);
            }
        }
    }
}