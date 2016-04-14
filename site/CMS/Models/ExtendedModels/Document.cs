using System.Linq;
using System;
using CMS.Mvc.Helpers;

namespace CMS.DocumentEngine.Types
{
    public partial class Document
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