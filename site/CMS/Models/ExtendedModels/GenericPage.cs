using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class GenericPage : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                if (this.Parent.DocumentName == "Privacy and Terms")
                {
                    var rt = string.Format("/Generic/Privacy-Terms/{0}", this.NodeAlias);
                    return rt;
                }
                else
                {
                    var rt = RouteHelper.GetRoute("Generic");
                    return (rt != null) ? rt.Route.Replace("{DocumentName}", this.NodeAlias) : string.Format("/Generic/{0}", this.NodeAlias);
                }
            }
        }
    }
}