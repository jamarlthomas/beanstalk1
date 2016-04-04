using System.Collections.Generic;
using System;
using System.Configuration;
using CMS.Mvc.Helpers;
using CMS.DocumentEngine.Types;
using CMS.Membership;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Blogs;
using CMS.Mvc.ViewModels.Shared;
using System.Linq;
using System.Web.Mvc;
using CMS.Mvc.Infrastructure.Models;

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

        public ActionResult Index(BlogsRequest request)
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
            model.Authors = model.Authors.OrderBy(a => a.Title != request.Author).ToList();

            model.Categories = new List<SelectorItemViewModel>
            {
                new SelectorItemViewModel
                {
                    Title = page.AllCategoriesSelectOption
                }
            };
            model.Categories.AddRange(MapData<BlogCategory, SelectorItemViewModel>(_blogCategoryProvider.GetBlogCategories(page.NodeAlias)));
            model.Categories = model.Categories.OrderBy(a => a.Title != request.Category).ToList();

            IEnumerable<BlogPost> blogPosts = _blogPostProvider.GetBlogPosts();
            
            if (!string.IsNullOrEmpty(request.Category) && request.Category != page.AllCategoriesSelectOption)
            {
                blogPosts = blogPosts.Where(w => w.Category == request.Category);
            }
            if (!string.IsNullOrEmpty(request.Author) && request.Author != page.AllAuthorsSelectOption)
            {
                blogPosts = blogPosts.Where(w => users.First(f => f.UserID == w.DocumentCreatedByUserID).FullName == request.Author);
            }

            blogPosts = blogPosts.OrderBy(f => f.BlogPostDate);
            if (!String.Equals(request.SortOrder, "DESC", StringComparison.OrdinalIgnoreCase))
            {
                blogPosts = blogPosts.Reverse();
            }
            var blogPostsList = blogPosts.ToList();

            var recordsOnPage = Int32.Parse(ConfigurationManager.AppSettings["NewsEventsBlogsRecordOnPageCount"]);
            model.BlogPosts = new List<BlogPostViewModel>();
            foreach (var post in blogPostsList.Skip((request.Page - 1) * recordsOnPage ?? 0).Take(recordsOnPage))
            {
                var postViewModel = MapData<BlogPost, BlogPostViewModel>(post);
                postViewModel.BlogPostDate = UtilsHelper.ConvertToCST(postViewModel.BlogPostDate);
                postViewModel.Category = post.Category;
                postViewModel.AuthorName = users.First(f => f.UserID == post.DocumentCreatedByUserID).FullName;
                model.BlogPosts.Add(postViewModel);
            }

            model.Tiles = _treeNodesProvider
                    .GetTreeNodes(page.ContentManagedTiles).Take(4).Select(tile => AutoMapper.Mapper.Map<TileViewModel>(tile)).ToList();

            model.Pagination = new PaginationViewModel
            {
                TotalPages = (int)Math.Ceiling((double)blogPostsList.Count / recordsOnPage),
                CurrentPage = request.Page ?? 1
            };
            model.SelectedSortOrder = request.SortOrder;

            return View("~/Views/Afton/Blogs/Index.cshtml", model);
        }
    }
}
