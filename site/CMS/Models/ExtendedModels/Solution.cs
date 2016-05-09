using System;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class Solution : IRoutedModel
    {
        public string DocumentRoutePath
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
        public DateTime Date
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