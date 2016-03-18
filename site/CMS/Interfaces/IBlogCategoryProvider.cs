using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IBlogCategoryProvider
    {
        List<BlogCategory> GetBlogCategories(string parentAlias);
    }
}
