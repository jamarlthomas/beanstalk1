using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.DocumentBase;
using System.Web.Mvc;


namespace CMS.Mvc.Controllers.Afton
{
    public class BlogPostController : DocumentBaseController
    {
        private readonly IBlogPostProvider _blogPostProvider;

        public BlogPostController()
        {
            _blogPostProvider = new BlogPostProvider();
        }

        public BlogPostController(IBlogPostProvider blogPostProvider)
        {
            _blogPostProvider = blogPostProvider;
        }

        [PageVisitActivity]
        public ActionResult Index(string BlogPostName)
        {
            var blogPost = _blogPostProvider.GetBlogPost(BlogPostName);

            var blogViewModel = new DocumentBaseViewModel
            {
                Title = blogPost.BlogPostTitle,
                DocumentPublishFrom = blogPost.BlogPostDate,
                Abstract = blogPost.BlogPostBody
            };

            return GetBaseLayout(blogViewModel, blogPost);
        }
    }
}