using CMS.Mvc.Helpers;

namespace CMS.DocumentEngine.Types
{
    public partial class SolutionBusinessUnit
    {
        public override string DocumentNamePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("Solution");
                return (rt != null)
                    ? rt.Route.Replace("{SBUName}", NodeAlias)
                    :string.Format("/SBU/Index/{0}", this.NodeAlias);
            }
        }
    }
}
