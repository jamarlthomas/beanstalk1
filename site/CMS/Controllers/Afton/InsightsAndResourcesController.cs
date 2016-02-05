using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.InsightsAndResources;
using CMS.Mvc.ViewModels.Shared;
using System.Web.Mvc;
using System.Linq;
using System.Collections.Generic;
using CMS.DocumentEngine;

namespace CMS.Mvc.Controllers.Afton
{
	public class InsightsAndResourcesController : BaseController
	{
		private readonly ISolutionBusinessUnitProvider _solutionBusinessUnitProvider;
		private readonly IInsightsResourcesProvider _insightsAndResourcesPageProvider;
		private readonly IDocumentTypeProvider _documentTypeProvider;
		private readonly IDocumentProvider _documentProvider;
		private readonly IResourceTileProvider _resourceTileProvider;


		public InsightsAndResourcesController()
		{
			_solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
			_insightsAndResourcesPageProvider = new InsightsResourcesProvider();
			_documentTypeProvider = new DocumentTypeProvider();
			_documentProvider = new DocumentProvider();
			_resourceTileProvider = new ResourceTileProvider();
		}

		public InsightsAndResourcesController(ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
			ISolutionProvider solutionProvider,
			IProductProvider productProvider,
			IInsightsResourcesProvider insightsAndResourcesPageProvider,
			IDocumentTypeProvider documentTypeProvider,
			IDocumentProvider documentProvider,
			IResourceTileProvider resourceTileProvider)
		{
			_solutionBusinessUnitProvider = solutionBusinessUnitProvider;
			_insightsAndResourcesPageProvider = insightsAndResourcesPageProvider;
			_documentTypeProvider = documentTypeProvider;
			_documentProvider = documentProvider;
			_resourceTileProvider = resourceTileProvider;
		}

		public ActionResult Index()
		{
			var page = _insightsAndResourcesPageProvider.GetInsightsResources().First();
			var model = MapData<InsightsResources, InsightsAndResourcesViewModel>(page);
			model.InsightsListing = new List<InsightsListingItemViewModel>
			{
				new InsightsListingItemViewModel 
				{
					Title = "Product Data Sheets",
					Links = MapData<SolutionBusinessUnit, LinkViewModel>(_solutionBusinessUnitProvider.GetSolutionBusinessUnits())
				}
			};
			model.InsightsListing.AddRange(_documentTypeProvider.GetDocumentTypes().Select(s => new InsightsListingItemViewModel
			{
				Title = s.Title,
				Links = MapData<Document, LinkViewModel>(_documentProvider.GetHighlightedDocuments(s.Title))
			}));
			model.Tiles = _resourceTileProvider.GetTiles(page.FeaturedContentList, page.Site.DisplayName).Select(s => AutoMapper.Mapper.Map<TileViewModel>(s)).ToList();
			return View("~/Views/Afton/InsightsAndResources/Index.cshtml", model);
		}
	}
}
