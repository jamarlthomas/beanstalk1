using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class NewsAndEventsPageProvier : INewsAndEventsPageProvier
    {
        public NewsAndEventsPage GetNewsAndEventsPage()
        {
            return ContentHelper.GetDoc<NewsAndEventsPage>(NewsAndEventsPage.CLASS_NAME);
        }
    }
}