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
            request.ClassNames = AllowedClassNames;
            request.RecordsOnPage = int.Parse(ConfigurationManager.AppSettings["GlobalSearchRecordOnPageCount"]);
            return ContentHelper.PerformSearch(request);
        }

        private readonly static string AllowedClassNames = GetClassNames();

        private static string GetClassNames()
        {
            var allowedClasses = new List<string>
            {
                ATCToolsPage.CLASS_NAME,
                BlogsPage.CLASS_NAME,
                ContactPage.CLASS_NAME,
                CustomNews.CLASS_NAME,
                Document.CLASS_NAME,
                Event.CLASS_NAME,
                FAQItem.CLASS_NAME,
                FAQPage.CLASS_NAME,
                GenericModel.CLASS_NAME,
                GenericPage.CLASS_NAME,
                InsightsResources.CLASS_NAME,
                News.CLASS_NAME,
                NewsAndEventsPage.CLASS_NAME,
                PollSurvey.CLASS_NAME,
                Product.CLASS_NAME,
                SalesOffice.CLASS_NAME,
                Solution.CLASS_NAME,
                SolutionBusinessUnit.CLASS_NAME,
                Term.CLASS_NAME,
                TermsAndAcronymsPage.CLASS_NAME,
            };
            var sb = new StringBuilder();
            for (int i = 0; i < allowedClasses.Count - 1; i++)
            {
                sb.AppendFormat("{0};", allowedClasses[i]);
            }
            sb.Append(allowedClasses[allowedClasses.Count - 1]);
            return sb.ToString();
        }
    }
}