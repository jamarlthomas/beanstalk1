using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class SolutionBusinessUnit : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("SBU");
                return (rt != null)
                    ? rt.Route.Replace("{SBUName}", NodeAlias)
                    :string.Format("/SBU/Index/{0}", this.NodeAlias);
            }
        }
    }
}
