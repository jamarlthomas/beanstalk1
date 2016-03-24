using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class BlogPostProvider : IBlogPostProvider
    {
        public List<BlogPost> GetBlogPosts()
        {
            return ContentHelper.GetDocs<BlogPost>(BlogPost.CLASS_NAME);
        }
    }
}