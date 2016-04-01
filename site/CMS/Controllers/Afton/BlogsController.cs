using System.Collections.Generic;
using System;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Helpers;
using CMS.DocumentEngine.Types;
using CMS.Membership;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Blogs;
using CMS.Mvc.ViewModels.Shared;
using System.Linq;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class BlogsController : BaseController
    {
        private readonly IBlogsPageProvider _blogsPageProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;
        private readonly IUsersProvider _usersProvider;
        private readonly IBlogCategoryProvider _blogCategoryProvider;
        private readonly IBlogPostProvider _blogPostProvider;

        public BlogsController()
        {
            _blogsPageProvider = new BlogsPageProvider();
            _treeNodesProvider = new TreeNodesProvider();
            _usersProvider = new UsersProvider();
            _blogCategoryProvider = new BlogCategoryProvider();
            _blogPostProvider = new BlogPostProvider();
        }

        public BlogsController(IBlogsPageProvider blogsPageProvider,
            ITreeNodesProvider treeNodesProvider,
            IUsersProvider usersProvider,
            IBlogCategoryProvider blogCategoryProvider,
            IBlogPostProvider blogPostProvider)
        {
            _blogsPageProvider = blogsPageProvider;
            _treeNodesProvider = treeNodesProvider;
            _usersProvider = usersProvider;
            _blogCategoryProvider = blogCategoryProvider;
            _blogPostProvider = blogPostProvider;
        }
        [PageVisitActivity]
        public ActionResult Index()
        {
            var page = _blogsPageProvider.GetBlogsPages().First();
            var model = MapData<BlogsPage, BlogsPageViewModel>(page);
            var users = _usersProvider.GetUsers();
            model.Authors = new List<SelectorItemViewModel>
            {
                new SelectorItemViewModel 
                {
                    Title = page.AllAuthorsSelectOption
                }
            };
            model.Authors.AddRange(users.Select(s => new SelectorItemViewModel
            {
                Title = s.FullName
            }));
            model.Categories = new List<SelectorItemViewModel>
            {
                new SelectorItemViewModel 
                {
                    Title = page.AllCategoriesSelectOption
                }
            };
            model.Categories.AddRange(MapData<BlogCategory, SelectorItemViewModel>(_blogCategoryProvider.GetBlogCategories(page.NodeAlias)));

            var blogPosts = _blogPostProvider.GetBlogPosts();
            model.BlogPosts = new List<BlogPostViewModel>();
            foreach (var post in blogPosts)
            {
                var postViewModel = MapData<BlogPost, BlogPostViewModel>(post);
                postViewModel.BlogPostDate = UtilsHelper.ConvertToCST(postViewModel.BlogPostDate);
                postViewModel.Category = (post.Parent as BlogCategory ?? post.Parent.Parent as BlogCategory).Title;
                var createdByUserId = post.GetIntegerValue("DocumentCreatedByUserID", default(int));
                postViewModel.AuthorName = users.First(f => f.UserID == createdByUserId).FullName;
                model.BlogPosts.Add(postViewModel);
            }

            model.Tiles = _treeNodesProvider
                .GetTreeNodes(page.ContentManagedTiles).Take(4).Select(tile => AutoMapper.Mapper.Map<TileViewModel>(tile)).ToList();
            return View("~/Views/Afton/Blogs/Index.cshtml", model);
        }
    }
}
