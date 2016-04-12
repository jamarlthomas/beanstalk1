using System;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.SelectionFilter;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Mvc;
using CMS.Mvc.ViewModels.SBU;

namespace CMS.Mvc.Controllers.Afton
{
    public class SelectionFilterController : BaseController
    {
        private readonly IProductProvider _productProvider;
        private readonly ILookupProvider _lookupProvider;
        private readonly ISelectionFilterPageProvider _selectionFilterPageProvider;
        private readonly IDocumentTypeProvider _documentTypeProvider;
        private readonly ISolutionBusinessUnitProvider _solutionBusinessUnitProvider;
        private readonly ISolutionProvider _solutionProvider;
        private readonly ISelectionFilterSearchProvider _selectionFilterSearchProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;
        private readonly IPageTypeDisplayValueProvider _pageTypeDisplayValueProvider;
        private readonly IRegionProvider _regionProvider;
        private readonly ISelectionFilterConstantsProvider _selectionFilterConstantsProvider;


        public SelectionFilterController()
        {
            _selectionFilterPageProvider = new SelectionFilterPageProvider();
            _documentTypeProvider = new DocumentTypeProvider();
            _solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
            _solutionProvider = new SolutionProvider();
            _selectionFilterSearchProvider = new SelectionFilterSearchProvider();
            _treeNodesProvider = new TreeNodesProvider();
            _pageTypeDisplayValueProvider = new PageTypeDisplayValueProvider();
            _regionProvider = new RegionProvider();
            _selectionFilterConstantsProvider = new SelectionFilterConstantsProvider();
        }

        public SelectionFilterController(ISelectionFilterPageProvider selectionFilterPageProvider,
            IDocumentTypeProvider documentTypeProvider,
            ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
            ISolutionProvider solutionProvider,
            ISelectionFilterSearchProvider selectionFilterSearchProvider,
            ITreeNodesProvider treeNodesProvider,
            IPageTypeDisplayValueProvider pageTypeDisplayValueProvider,
            IRegionProvider regionProvider,
            ISelectionFilterConstantsProvider selectionFilterConstantsProvider)
        {
            _selectionFilterPageProvider = selectionFilterPageProvider;
            _documentTypeProvider = documentTypeProvider;
            _solutionBusinessUnitProvider = solutionBusinessUnitProvider;
            _solutionProvider = solutionProvider;
            _selectionFilterSearchProvider = selectionFilterSearchProvider;
            _treeNodesProvider = treeNodesProvider;
            _pageTypeDisplayValueProvider = pageTypeDisplayValueProvider;
            _regionProvider = regionProvider;
            _selectionFilterConstantsProvider = selectionFilterConstantsProvider;
        }

        [Route("filter/regions/{Regions}/documents/{DocumentTypesIds}/SBU/{SBUId}/solutions/{SolutionsIds}/sort/{SortOrder}/page/{PageNumber}/search/{Query?}")]
        public JsonResult SearchAction(SelectionFilterSearchRequest request)
        {
            return Json(Search(request), JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index(string name, SelectionFilterSearchRequest searchRequest)
        {
            var page = _selectionFilterPageProvider.GetSelectionFilterPage(name);
            var pageConstants = _selectionFilterConstantsProvider.GetSelectionFilterConstants();
            var model = MapData<SelectionFilterConstants, SelectionFilterViewModel>(pageConstants);

            var defaultPage = _selectionFilterPageProvider.GetDefaultSelectionFilterPage();
            model.Header = new HeaderViewModel
            {
                Title = pageConstants.Title,
                ViewInsightsResourcesLink = defaultPage.DocumentNamePath != page.DocumentNamePath ? defaultPage.DocumentNamePath : null,
                ViewInsightsResourcesLabel = pageConstants.ViewInsightsResourcesLabel,
                BreadCrumb = new BreadCrumbViewModel
                {
                    BreadcrumbLinkItems = _treeNodesProvider.GetBreadcrumb(page.DocumentGUID)
                }
            };

            model.SBUList = MapData<SolutionBusinessUnit, SBUFilterViewModel>(_solutionBusinessUnitProvider.GetParentOrDefaultSBUs(page));
            foreach (var sbu in model.SBUList)
            {
                sbu.SolutionsList = _solutionProvider.GetSolutions(sbu.Title)
                    .Select(solution => new CheckBoxViewModel { Title = solution.Title, Value = solution.NodeID.ToString() }).ToList();
            }
            model.SBUList = model.SBUList.Where(w => w.SolutionsList != null && w.SolutionsList.Any()).ToList();

            model.RegionsList = _regionProvider.GetRegions().Select(region => new CheckBoxViewModel { Title = region.Title, Value = region.RegionID.ToString() }).ToList();
            model.DocumentTypesList = _documentTypeProvider.GetDocumentTypes()
                .Select(documentType => new CheckBoxViewModel { Title = documentType.Title, Value = documentType.NodeID.ToString() }).ToList();

            return View("~/Views/Afton/SelectionFilter/Index.cshtml", model);
        }

        private SelectionFilterSearchViewModel Search(SelectionFilterSearchRequest request)
        {
            request.Regions = request.Regions == RouteHelper.NULL_VALUE_PLACEHOLDER ? null : request.Regions;
            if (request.DocumentTypesIds == RouteHelper.NULL_VALUE_PLACEHOLDER)
            {
                request.DocumentTypesIds = MapTreeNodesToIdStr(_documentTypeProvider.GetDocumentTypes());
            }

            if (request.SolutionsIds == RouteHelper.NULL_VALUE_PLACEHOLDER)
            {
                if (request.SBUId != RouteHelper.NULL_VALUE_PLACEHOLDER)
                {
                    request.SolutionsIds = MapTreeNodesToIdStr(_solutionProvider.GetSolutions(
                        TreePathUtils.GetAlias(TreePathUtils.GetAliasPathByNodeId(int.Parse(request.SBUId)))));
                }
                else
                {
                    request.SolutionsIds = MapTreeNodesToIdStr(_solutionProvider.GetSolutions());
                }
            }

            var searchResult = _selectionFilterSearchProvider.PerformSearch(request);

            if (searchResult.PageCount == 0) return new SelectionFilterSearchViewModel
            {
                results = new List<SelectionFilterSearchItemViewModel>()
            };
            return new SelectionFilterSearchViewModel
            {
                pagecount = searchResult.ResultsCount, //number of results instead of pages requires by frontend
                itemsPerpage = int.Parse(ConfigurationManager.AppSettings["SelectionFilterRecordOnPageCount"]),
                results = searchResult.Items.Select(MapSearchResult).ToList()
            };
        }

        private SelectionFilterSearchItemViewModel MapSearchResult(SearchResultItem searchResultItem)
        {
            var nodeId = TreePathUtils.GetNodeIdByAliasPath(ConfigurationManager.AppSettings["SiteName"], searchResultItem.Title);
            var node = _treeNodesProvider.GetTreeNodeByNodeId(nodeId);
            var pageTypeDisplayValue = _pageTypeDisplayValueProvider.GetDisplayValue(node.ClassName);
            return new SelectionFilterSearchItemViewModel
            {
                Title = searchResultItem.Date ?? node.GetStringValue("Title", string.Empty), //due kentico limitation date field used for title
                Link = node.DocumentNamePath,
                Description = searchResultItem.Content,
                Image = !string.IsNullOrEmpty(searchResultItem.Image) ? Url.Content(searchResultItem.Image) : null,
                Type = pageTypeDisplayValue != null ? pageTypeDisplayValue.DisplayValue : string.Empty,
                PostedDate = (DateTime)node.GetValue("DocumentCreatedWhen"),
                SBU = node.Parent.Parent is SolutionBusinessUnit ? (node.Parent.Parent as SolutionBusinessUnit).Title : null,
                Solution = node.Parent is Solution ? (node.Parent as Solution).Title : null
            };
        }

        private string MapTreeNodesToIdStr<T>(List<T> treeNodes) where T : TreeNode
        {
            return string.Join(",", treeNodes.Select(s => s.NodeID));
        }
    }
}
