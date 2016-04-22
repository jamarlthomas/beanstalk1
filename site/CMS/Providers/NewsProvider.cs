using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class NewsProvider : INewsProvider
    {
        public CustomNews GetNewsItem(string alias)
        {
            return ContentHelper.GetDocByName<CustomNews>(CustomNews.CLASS_NAME, alias);
        }
    }
}