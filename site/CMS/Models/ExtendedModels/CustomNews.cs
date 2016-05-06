using System;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class CustomNews : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("News");
                return (rt != null) ? rt.Route.Replace("{NewsName}", this.NodeAlias) : string.Format("/News/Index/{0}", this.NodeAlias);
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
