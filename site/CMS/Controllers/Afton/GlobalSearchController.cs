using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.GlobalSearch;
using System;
using System.Configuration;
using System.Linq;
using System.Web.Mvc;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.Controllers.Afton
{
    public class GlobalSearchController : BaseController
    {
        private readonly IGlobalSearchProvider _globalSearchProvider;
        private readonly IGlobalSearchPageProvider _globalSearchPageProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;
        private readonly IPageTypeDisplayValueProvider _pageTypeDisplayValueProvider;


        public GlobalSearchController()
        {
            _globalSearchProvider = new GlobalSearchProvider();
            _globalSearchPageProvider = new GlobalSearchPageProvider();
            _treeNodesProvider = new TreeNodesProvider();
            _pageTypeDisplayValueProvider = new PageTypeDisplayValueProvider();
        }

        public GlobalSearchController(IGlobalSearchProvider globalSearchProvider,
            IGlobalSearchPageProvider globalSearchPageProvider,
            ITreeNodesProvider treeNodesProvider,
            IPageTypeDisplayValueProvider pageTypeDisplayValueProvider)
        {
            _globalSearchProvider = globalSearchProvider;
            _globalSearchPageProvider = globalSearchPageProvider;
            _treeNodesProvider = treeNodesProvider;
            _pageTypeDisplayValueProvider = pageTypeDisplayValueProvider;
        }

        public ActionResult Index(GlobalSearchRequest request)
        {
            return View("~/Views/Afton/GlobalSearch/Index.cshtml", Search(request));
        }

        private GlobalSearchPageViewModel Search(GlobalSearchRequest request)
        {
            var searchResults = _globalSearchProvider.PerformSearch(request);
            var page = _globalSearchPageProvider.GetGlobalSearchPage();
            var viewModel = MapData<GlobalSearchPage, GlobalSearchPageViewModel>(page);
            viewModel.PageCount = searchResults.PageCount;
            viewModel.ResultsCount = searchResults.ResultsCount;
            viewModel.SearchTerm = request.Query;
            if (searchResults.Items != null)
            {
                viewModel.Results = searchResults.Items.Select(searchResult =>
                {
                    var nodeId = TreePathUtils.GetNodeIdByAliasPath(ConfigurationManager.AppSettings["SiteName"], searchResult.Title);
                    var node = _treeNodesProvider.GetTreeNodeByNodeId(nodeId);
                    var pageTypeDisplayValue = _pageTypeDisplayValueProvider.GetDisplayValue(node.ClassName);
                    return new ResultItemViewModel
                    {
                        Title = searchResult.Date ?? node.GetStringValue("Title", string.Empty), //due kentico limitation date field used for title
                        DocumentNamePath = node.DocumentNamePath,
                        Content = searchResult.Content,
                        Image = searchResult.Image,
                        Type = pageTypeDisplayValue != null ? pageTypeDisplayValue.DisplayValue : string.Empty
                    };
                }).ToList();
            }
            viewModel.Pagination = new PaginationViewModel
            {
                BaseUrl = string.Format("{0}?Query={1}", page.DocumentNamePath, request.Query),
                TotalPages = searchResults.PageCount,
                CurrentPage = request.PageNumber ?? 1,
                PageArgName = "PageNumber"
            };
            return viewModel;
        }
    }
}