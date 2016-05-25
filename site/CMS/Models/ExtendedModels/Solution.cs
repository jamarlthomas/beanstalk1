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
                if (Parent.ClassName == SolutionBusinessUnit.CLASS_NAME)
                {

                    var rt = RouteHelper.GetRoute("Solution");
                    return rt.Route
                        .Replace("{SBUName}", Parent.NodeAlias)
                        .Replace("{SolutionName}", NodeAlias);
                }
                else
                {
                    var rt = RouteHelper.GetRoute("SubSolution");
                    return rt.Route
                        .Replace("{SBUName}", Parent.Parent.NodeAlias)
                        .Replace("{SolutionName}", Parent.NodeAlias)
                        .Replace("{SubSolution}", NodeAlias);
                }
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