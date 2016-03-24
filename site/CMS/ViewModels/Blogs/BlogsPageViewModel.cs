using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.Blogs
{
    public class BlogsPageViewModel : NewsEventsAndBlogBasePageViewModel
    {
        public List<BlogPostViewModel> BlogPosts { get; set; }
        public List<SelectorItemViewModel> Authors { get; set; }
        public List<SelectorItemViewModel> Categories { get; set; }
    }
}