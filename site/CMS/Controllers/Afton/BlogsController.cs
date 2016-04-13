using CMS.DocumentEngine.Types;
using CMS.Membership;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Blogs;
using CMS.Mvc.ViewModels.Shared;
using System;
using System.Collections.Generic;
using System.Configuration;
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
        private static readonly int _recordsOnPage = Int32.Parse(ConfigurationManager.AppSettings["NewsEventsBlogsRecordOnPageCount"]);

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
        public ActionResult Index(BlogsRequest request)
        {
            var page = _blogsPageProvider.GetBlogsPage();
            var model = MapData<BlogsPage, BlogsPageViewModel>(page);
            var users = _usersProvider.GetUsers();
            
            model.Authors = GetAuthorsViewModel(request, page, users);

            model.Categories = GetCategoriesViewModel(request, page);

            var blogPostsList = _blogPostProvider.GetFilteredBlogPosts(request, page, users);

            model.BlogPosts = blogPostsList.Skip((request.Page - 1) * _recordsOnPage ?? 0).Take(_recordsOnPage).Select(post => MapPostToBlogPostViewModel(post, users)).ToList();

            model.Tiles = _treeNodesProvider.GetTreeNodes(page.ContentManagedTiles).Take(4).Select(tile => AutoMapper.Mapper.Map<TileViewModel>(tile)).ToList();

            model.Pagination = new PaginationViewModel
            {
                TotalPages = (int)Math.Ceiling((double)blogPostsList.Count / _recordsOnPage),
                CurrentPage = request.Page ?? 1,
                BaseUrl = UtilsHelper.GetBaseUrlWithoutIntParam(Request.Url.PathAndQuery, "page"),
                PageArgName = "page"
            };
            model.SelectedSortOrder = request.SortOrder;

            return View("~/Views/Afton/Blogs/Index.cshtml", model);
        }

        private List<SelectorItemViewModel> GetAuthorsViewModel(BlogsRequest request, BlogsPage page, List<UserInfo> users)
        {
            var result = new List<SelectorItemViewModel>
            {
                new SelectorItemViewModel
                {
                    Title = page.AllAuthorsSelectOption
                }
            };
            result.AddRange(users.Select(s => new SelectorItemViewModel
            {
                Title = s.FullName
            }));
            return result.OrderBy(a => a.Title != request.Author).ToList();
        }

        private List<SelectorItemViewModel> GetCategoriesViewModel(BlogsRequest request, BlogsPage page)
        {
            var result = new List<SelectorItemViewModel>
            {
                new SelectorItemViewModel
                {
                    Title = page.AllCategoriesSelectOption
                }
            };
            result.AddRange(MapData<BlogCategory, SelectorItemViewModel>(_blogCategoryProvider.GetBlogCategories(page.NodeAlias)));
            return result.OrderBy(a => a.Title != request.Category).ToList();

        }

        private BlogPostViewModel MapPostToBlogPostViewModel(BlogPost post, List<UserInfo> users)
        {
            var postViewModel = MapData<BlogPost, BlogPostViewModel>(post);
            postViewModel.BlogPostDate = UtilsHelper.ConvertToCST(postViewModel.BlogPostDate);
            postViewModel.Category = post.Category;
            postViewModel.AuthorName = users.First(f => f.UserID == post.DocumentCreatedByUserID).FullName;
            return postViewModel;
        }
    }
}
