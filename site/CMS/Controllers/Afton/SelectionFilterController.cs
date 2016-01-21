using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure.Enums;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.SelectionFilter;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
	public class SelectionFilterController : BaseController
	{
		private const string NULL_VALUE_PLACEHOLDER = "-1";

		private readonly IProductProvider _productProvider;
		private readonly ILookupProvider _lookupProvider;
		private readonly ISelectionFilterPageProvider _selectionFilterPageProvider;
		private readonly IDocumentTypeProvider _documentTypeProvider;
		private readonly ISolutionBusinessUnitProvider _solutionBusinessUnitProvider;
		private readonly ISolutionProvider _solutionProvider;
		private readonly ISelectionFilterSearchProvider _selectionFilterSearchProvider;

		public SelectionFilterController()
		{
			_productProvider = new ProductProvider();
			_lookupProvider = new LookupProvider();
			_selectionFilterPageProvider = new SelectionFilterPageProvider();
			_documentTypeProvider = new DocumentTypeProvider();
			_solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
			_solutionProvider = new SolutionProvider();
			_selectionFilterSearchProvider = new SelectionFilterSearchProvider();
		}

		public SelectionFilterController(IProductProvider productProvider,
			ILookupProvider lookupProvider,
			ISelectionFilterPageProvider selectionFilterPageProvider,
			IDocumentTypeProvider documentTypeProvider,
			ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
			ISolutionProvider solutionProvider,
			ISelectionFilterSearchProvider selectionFilterSearchProvider)
		{
			_productProvider = productProvider;
			_lookupProvider = lookupProvider;
			_selectionFilterPageProvider = selectionFilterPageProvider;
			_documentTypeProvider = documentTypeProvider;
			_solutionBusinessUnitProvider = solutionBusinessUnitProvider;
			_solutionProvider = solutionProvider;
			_selectionFilterSearchProvider = selectionFilterSearchProvider;
		}

		[Route("filter/regions/{Regions}/documents/{DocumentTypesIds}/SBU/{SBUIds}/solutions/{SolutionsIds}")]
		public JsonResult Search(SearchRequest request)
		{
			request.Regions = request.Regions.Equals(NULL_VALUE_PLACEHOLDER) ? null : request.Regions;
			if (request.DocumentTypesIds == NULL_VALUE_PLACEHOLDER)
			{
				request.DocumentTypesIds = MapTreeNodeToIdStr(_documentTypeProvider.GetDocumentTypes());
			}

			if (request.SolutionsIds == NULL_VALUE_PLACEHOLDER)
			{
				if (request.SBUIds != NULL_VALUE_PLACEHOLDER)
				{
					request.SolutionsIds = MapTreeNodeToIdStr(_solutionProvider.GetSolutionItems(
						TreePathUtils.GetAlias(TreePathUtils.GetAliasPathByNodeId(int.Parse(request.SBUIds)))));
				}
				else
				{
					request.SolutionsIds = MapTreeNodeToIdStr(_solutionProvider.GetSolutionItems());
				}
			}

			var searchResult = _selectionFilterSearchProvider.PerformSearch(request);

			if (searchResult.PageCount == 0) return Json(new SelectionFilterSearchViewModel(), JsonRequestBehavior.AllowGet);
			return Json(new SelectionFilterSearchViewModel
			{
				pagecount = searchResult.PageCount,
				results = searchResult.Items.Select(s => new SelectionFilterSearchItemViewModel
					{
						Title = s.Image,
						Description = s.Content,
						Link = s.Title,
						Type = TreePathUtils.GetClassNameByAliasPath(ConfigurationManager.AppSettings["SiteName"], s.Title).Split('.').Last()
					}).ToList()
			}, JsonRequestBehavior.AllowGet);
		}

		public ActionResult Index(string name)
		{
			if (!string.IsNullOrEmpty(name))
			{
				var model = new SelectionFilterViewModel
				{
					Header = new HeaderViewModel
					{
						Title = name,
						BreadCrumb = new BreadCrumbViewModel()
					}
				};
				model.Header.BreadCrumb.BreadcrumbLinkItems = _selectionFilterPageProvider.GetBreadcrumb(name);
				model.DocumentTypesList = MapData<DocumentType, CheckBoxViewModel>(_documentTypeProvider.GetDocumentTypes());
				model.SBUList = MapData<SolutionBusinessUnit, SBUFilterViewModel>(_solutionBusinessUnitProvider.GetSolutionBusinessUnits()).Where(w => !string.IsNullOrEmpty(w.Title)).ToList();
				foreach (var sbu in model.SBUList)
				{
					sbu.SolutionsList = MapData<Solution, CheckBoxViewModel>(_solutionProvider.GetSolutionItems(sbu.Title));
				}
				var parent = _selectionFilterPageProvider.GetSelectionFilterPageParent(name);
				model.State = parent is SolutionBusinessUnit ?
					SelectionFilterPageStateEnum.SBU :
					parent is Solution ? SelectionFilterPageStateEnum.Solution : SelectionFilterPageStateEnum.Base;
				model.RegionsList = RegionsHelper.GetRegions().Select(s => new CheckBoxViewModel { Title = s }).ToList();
				return View("~/Views/Afton/SelectionFilter/Index.cshtml", model);
			}
			return null;
		}

		private string MapTreeNodeToIdStr<T>(List<T> treeNodes) where T : TreeNode
		{
			return string.Join(",", treeNodes.Select(s => s.NodeID));
		}
	}
}