using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using AutoMapper;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.InsightsAndResources;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.Controllers.Afton
{
    public class InsightsAndResourcesController : BaseController
    {
        private readonly IDocumentProvider _documentProvider;
        private readonly IDocumentTypeProvider _documentTypeProvider;
        private readonly IInsightsResourcesProvider _insightsAndResourcesPageProvider;
        private readonly IResourceTileProvider _resourceTileProvider;
        private readonly ISolutionBusinessUnitProvider _solutionBusinessUnitProvider;


        public InsightsAndResourcesController()
        {
            _solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
            _insightsAndResourcesPageProvider = new InsightsResourcesProvider();
            _documentTypeProvider = new DocumentTypeProvider();
            _documentProvider = new DocumentProvider();
            _resourceTileProvider = new ResourceTileProvider();
        }

        public InsightsAndResourcesController(ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
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
                    Title = page.ProductDataSheetsTitle,
                    Links = MapData<SolutionBusinessUnit, LinkViewModel>(_solutionBusinessUnitProvider.GetSolutionBusinessUnits())
                }
            };
            model.InsightsListing.AddRange(_documentTypeProvider.GetDocumentTypes().Select(s => new InsightsListingItemViewModel
            {
                Title = s.Title,
                Links = MapData<Document, LinkViewModel>(_documentProvider.GetHighlightedDocuments(s.Title))
            }));
            model.Tiles = new List<TileViewModel>
            {
                new TileViewModel 
                {
                    Title = page.StayInformedTileTitle,
                    Description = page.StayInformedTileDescription
                }
            };
            model.Tiles.AddRange(_resourceTileProvider.GetTiles(page.FeaturedContentList, page.Site.DisplayName)
                .Select(s => Mapper.Map<TileViewModel>(s)).ToList());
            return View("~/Views/Afton/InsightsAndResources/Index.cshtml", model);
        }
    }
}