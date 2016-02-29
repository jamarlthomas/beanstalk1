using System.Collections.Generic;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class NewsAndEventsPageProvier : INewsAndEventsPageProvier
    {
        public IList<NewsAndEventsPage> GetNewsAndEventsPages()
        {
            return ContentHelper.GetDocs<NewsAndEventsPage>(NewsAndEventsPage.CLASS_NAME);
        }
    }
}