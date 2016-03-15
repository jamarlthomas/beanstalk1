using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Infrastructure.Models;
using System.Text;

namespace CMS.Mvc.Helpers
{
    public static class RouteHelper
    {
        public const string NULL_VALUE_PLACEHOLDER = "-1";

        public static string GetSelectionFilterUrl(SearchRequest searchRequest, string name = null)
        {
            StringBuilder sb = new StringBuilder("/SelectionFilter/Index");
            if (!string.IsNullOrEmpty(name))
            {
                sb.AppendFormat("/{0}", name);
            }
            sb.AppendFormat("?Regions={0}", searchRequest.Regions ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("&DocumentTypesIds={0}", searchRequest.DocumentTypesIds ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("&SBUId={0}", searchRequest.SBUId ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("&SolutionsIds={0}", searchRequest.SolutionsIds ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("&SortOrder={0}", searchRequest.SortOrder ?? string.Empty);
            sb.AppendFormat("&Query={0}", searchRequest.Query ?? string.Empty);
            if (searchRequest.PageNumber.HasValue)
            {
                sb.AppendFormat("&PageNumber={0}", searchRequest.PageNumber);
            }
            return sb.ToString();
        }
    }
}