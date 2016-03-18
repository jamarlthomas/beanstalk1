using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class BlogCategoryProvider : IBlogCategoryProvider
    {
        public List<BlogCategory> GetBlogCategories(string parentAlias)
        {
            return ContentHelper.GetDocChildrenByName<BlogCategory>(BlogCategory.CLASS_NAME, parentAlias);
        }
    }
}