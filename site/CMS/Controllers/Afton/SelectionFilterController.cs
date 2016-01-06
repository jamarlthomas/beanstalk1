using System.Collections.Generic;
using System.Web.Mvc;
using System.Linq;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.SelectionFilter;
using CMS.Mvc.Helpers;

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


		public SelectionFilterController()
		{
			_productProvider = new ProductProvider();
			_lookupProvider = new LookupProvider();
			_selectionFilterPageProvider = new SelectionFilterPageProvider();
			_documentTypeProvider = new DocumentTypeProvider();
			_solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
			_solutionProvider = new SolutionProvider();
		}

		public SelectionFilterController(IProductProvider productProvider,
			ILookupProvider lookupProvider,
			ISelectionFilterPageProvider selectionFilterPageProvider,
			IDocumentTypeProvider documentTypeProvider,
			ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
			ISolutionProvider solutionProvider)
		{
			_productProvider = productProvider;
			_lookupProvider = lookupProvider;
			_selectionFilterPageProvider = selectionFilterPageProvider;
			_documentTypeProvider = documentTypeProvider;
			_solutionBusinessUnitProvider = solutionBusinessUnitProvider;
			_solutionProvider = solutionProvider;
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
				if (parent is SolutionBusinessUnit)
				{
					model.State = SelectionFilterPageStateEnum.SBU;
				}
				else if (parent is Solution)
				{
					model.State = SelectionFilterPageStateEnum.Solution;
				}
				else
				{
					model.State = SelectionFilterPageStateEnum.Base;
				}
				model.RegionsList = RegionsHelper.GetRegions().Select(s => new CheckBoxViewModel { Title = s }).ToList();
				return View("~/Views/Afton/SelectionFilter/Index.cshtml", model);
			}
			return null;
		}
	}
}