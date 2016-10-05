using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CMS.Mvc.Providers
{
    public class NewsAndEventsPageProvier : INewsAndEventsPageProvier
    {
        public NewsAndEventsPage GetNewsAndEventsPage()
        {
            return ContentHelper.GetDoc<NewsAndEventsPage>(NewsAndEventsPage.CLASS_NAME);
        }

        public IEnumerable<TreeNode> GetContentList(NewsAndEventsPage page, NewsAndEventsRequest request)
        {
            var ContentList = ContentHelper.GetDocsByGuidsNews( UtilsHelper.ParseGuids( page.NewsAndEvents ) );
            ContentList = ContentList.Concat( ContentHelper.GetDocsByGuidsNews( UtilsHelper.ParseGuids( page.NewsList ) )).ToList();
            return ContentList
                .Where( node =>
                {
                    if ( String.Equals( request.Category, page.NewsSelectorValue, StringComparison.OrdinalIgnoreCase ) )
                    {
                        return node is CustomNews;
                    }
                    else
                    {
                        return !String.Equals( request.Category, page.EventsSelectorValue, StringComparison.OrdinalIgnoreCase ) || node is Event;
                    }
                } )
                .OrderBy(f => f.GetDateTimeValue("Date", default(DateTime)));
        }

        public List<string> GetDocumentTypes(NewsAndEventsPage page, string category)
        {
            var result = new List<string>
            {
                page.AllNewsEventsSelectorValue,
                page.NewsSelectorValue,
                page.EventsSelectorValue,
            };

            if (!string.IsNullOrEmpty(category))
            {
                result = result.OrderBy(s => !s.StartsWith(category)).ToList();
            }

            return result;
        }
    }
}