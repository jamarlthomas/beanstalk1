using System.Collections.Generic;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class BlogsPageProvider : IBlogsPageProvider
    {
        public IList<BlogsPage> GetBlogsPages()
        {
            return ContentHelper.GetDocs<BlogsPage>(BlogsPage.CLASS_NAME);
        }
    }
}