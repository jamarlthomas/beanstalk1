using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;
using System;

namespace CMS.Mvc.ViewModels.Blogs
{
    public class BlogPostViewModel
    {
        public string BlogPostTitle { get; set; }
        public string Category { get; set; }
        public DateTime BlogPostDate { get; set; }
        public string BlogPostSummary { get; set; }
        public string BlogPostBody { get; set; }
        public string AuthorName { get; set; }
        public Guid BlogPostTeaser { get; set; }
        public string DocumentNamePath { get; set; }
    }
}