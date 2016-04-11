using System.Linq;
using CMS.Mvc.Helpers;
using iTextSharp.text;

namespace CMS.DocumentEngine.Types
{
    public partial class CustomNews
    {
        public override string DocumentNamePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("Document");
                return (rt != null) ? rt.Route.Replace("{DocumentName}", this.NodeAlias) : string.Format("/Document/Index/{0}", this.NodeAlias);
                //return string.Format("/Document/Index/{0}", this.NodeAlias);
            }
        }
    }
}