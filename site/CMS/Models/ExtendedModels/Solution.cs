using CMS.Mvc.Helpers;

namespace CMS.DocumentEngine.Types
{
    public partial class Solution
    {
        public override string DocumentNamePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("Solution");
                return (rt != null)
                    ? rt.Route.Replace("{SolutionName}", NodeAlias)
                        .Replace("{SBUName}", Parent.NodeAlias)
                    : string.Format("/Solution/Index/{0}/{1}", this.NodeAlias, this.Parent != null ? this.Parent.NodeAlias : string.Empty);
            }
        }
    }
}