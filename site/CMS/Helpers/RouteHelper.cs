using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Infrastructure.Models;
using System.Text;

namespace CMS.Mvc.Helpers
{
    public static class RouteHelper
    {
        public const string NULL_VALUE_PLACEHOLDER = "-1";

        public static string GetSelectionFilterUrl(SelectionFilterSearchRequest searchRequest, string name = null)
        {
            StringBuilder sb = new StringBuilder("/SelectionFilter/Index");
            if (!string.IsNullOrEmpty(name))
            {
                sb.AppendFormat("/{0}", name);
            }
            sb.AppendFormat("#/regions/{0}", searchRequest.Regions ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("/documents/{0}", searchRequest.DocumentTypesIds ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("/SBU/{0}", searchRequest.SBUId ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("/solutions/{0}", searchRequest.SolutionsIds ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("/sort/{0}", searchRequest.SortOrder ?? "Newest");
            sb.AppendFormat("/page/{0}", searchRequest.PageNumber ?? 1);
            sb.AppendFormat("/search/{0}", searchRequest.Query ?? string.Empty);
            return sb.ToString();
        }
    }
}