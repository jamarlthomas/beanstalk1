using CMS.DocumentEngine.Types;
using CMS.Membership;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;

namespace CMS.Mvc.Providers
{
    public class BlogPostProvider : IBlogPostProvider
    {
        public List<BlogPost> GetBlogPosts()
        {
            return ContentHelper.GetDocs<BlogPost>(BlogPost.CLASS_NAME);
        }

        public List<BlogPost> GetFilteredBlogPosts(BlogsRequest request, BlogsPage page, List<UserInfo> users)
        {
            IEnumerable<BlogPost> blogPosts = GetBlogPosts();

            if (!string.IsNullOrEmpty(request.Category) && request.Category != page.AllCategoriesSelectOption)
            {
                blogPosts = blogPosts.Where(w => w.Category == request.Category);
            }
            if (!string.IsNullOrEmpty(request.Author) && request.Author != page.AllAuthorsSelectOption)
            {
                blogPosts = blogPosts.Where(w => users.First(f => f.UserID == w.DocumentCreatedByUserID).FullName == request.Author);
            }

            blogPosts = blogPosts.OrderBy(f => f.BlogPostDate);
            if (!String.Equals(request.SortOrder, "ASC", StringComparison.OrdinalIgnoreCase))
            {
                blogPosts = blogPosts.Reverse();
            }
            var recordsOnPage = Int32.Parse(ConfigurationManager.AppSettings["NewsEventsBlogsRecordOnPageCount"]);

            return blogPosts.ToList();
        }
    }
}