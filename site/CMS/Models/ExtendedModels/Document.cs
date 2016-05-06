using System;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class Document : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("Document");
                return (rt != null) ? rt.Route.Replace("{DocumentName}", this.NodeAlias) : string.Format("/Document/Index/{0}", this.NodeAlias);
            }
        }

        public override DateTime DocumentPublishFrom
        {
            get
            {
                DateTime result;
                if (base.DocumentPublishFrom == default(DateTime))
                {
                    result = GetDateTimeValue("DocumentCreatedWhen", default(DateTime));
                }
                else
                {
                    result = base.DocumentPublishFrom;
                }
                return UtilsHelper.ConvertToCST(result);
            }
        }
    }
}