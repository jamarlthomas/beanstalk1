using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;
using System.Configuration;
using System.Text;

namespace CMS.Mvc.Providers
{
    public class GlobalSearchProvider : IGlobalSearchProvider
    {
        public SearchResult PerformSearch(GlobalSearchRequest request)
        {
            request.IndexName = "GlobalSearch";
            request.RecordsOnPage = int.Parse(ConfigurationManager.AppSettings["GlobalSearchRecordOnPageCount"]);
            return ContentHelper.PerformSearch(request);
        }
    }
}