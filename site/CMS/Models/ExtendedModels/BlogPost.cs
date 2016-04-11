using System.Linq;
using CMS.Mvc.Helpers;
using iTextSharp.text;

namespace CMS.DocumentEngine.Types
{
    public partial class BlogPost
    {
        public override string DocumentNamePath
        {
            get
            {
                var rt= RouteHelper.GetRoute("Document");
                return (rt != null) ? rt.Route.Replace("{DocumentName}", this.NodeAlias) : string.Format("/Document/Index/{0}", this.NodeAlias);
            }
        }

        public string Category
        {
            get
            {
                return (Parent as BlogCategory ?? Parent.Parent as BlogCategory).Title;
            }
        }

        public int DocumentCreatedByUserID
        {
            get
            {
                return GetIntegerValue("DocumentCreatedByUserID", default(int));
            }
        }
    }
}
