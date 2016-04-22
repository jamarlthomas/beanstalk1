using System;
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
                var rt = RouteHelper.GetRoute("News");
                return (rt != null) ? rt.Route.Replace("{NewsName}", this.NodeAlias) : string.Format("/News/Index/{0}", this.NodeAlias);
                //return string.Format("/Document/Index/{0}", this.NodeAlias);
            }
        }

        public DateTime DocumentPublishFrom
        {
            get
            {
                return Date != default(DateTime) ? Date : GetDateTimeValue("DocumentCreatedWhen", default(DateTime));
            }
        }
    }
}