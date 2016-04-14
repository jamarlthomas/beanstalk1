﻿using System.Linq;
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
            StringBuilder sb = new StringBuilder(GetRoute("SelectionFilterPage").Route);
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

        public static string GetSelectionFilterViewAllUrl(string documentTypesIds)
        {
            return GetSelectionFilterUrl(new SelectionFilterSearchRequest { DocumentTypesIds = documentTypesIds });
        }

        internal static AftonRoute GetRoute(string routeName)
        {
            return ContentHelper.GetDocChildrenByName<AftonRoute>(AftonRoute.CLASS_NAME, "Routes").FirstOrDefault(r => r.DocumentName.Equals(routeName));
        }
    }
}