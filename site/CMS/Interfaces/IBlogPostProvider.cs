﻿using CMS.DocumentEngine.Types;
using System.Collections.Generic;
using CMS.Membership;
using CMS.Mvc.Infrastructure.Models;

namespace CMS.Mvc.Interfaces
{
    public interface IBlogPostProvider
    {
        List<BlogPost> GetBlogPosts();
        List<BlogPost> GetFilteredBlogPosts(BlogsRequest request, BlogsPage page, List<UserInfo> users);
        BlogPost GetBlogPost(string alias);
    }
}
