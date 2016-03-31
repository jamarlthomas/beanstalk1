using System.Collections.Generic;
using CMS.Mvc.Helpers;
using System.Linq;
using System.Web.Mvc;
using AutoMapper;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.InsightsAndResources;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.Infrastructure.Models;
using System.Configuration;

namespace CMS.Mvc.Controllers.Afton
{
    public class InsightsAndResourcesController : BaseController
    {
        private readonly IDocumentProvider _documentProvider;
        private readonly IDocumentTypeProvider _documentTypeProvider;
        private readonly IInsightsResourcesProvider _insightsAndResourcesPageProvider;
        private readonly IResourceTileProvider _resourceTileProvider;
        private readonly ISolutionBusinessUnitProvider _solutionBusinessUnitProvider;
        private readonly ISelectionFilterPageProvider _selectionFilterPageProvider;

        public InsightsAndResourcesController()
        {
            _solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
            _insightsAndResourcesPageProvider = new InsightsResourcesProvider();
            _documentTypeProvider = new DocumentTypeProvider();
            _documentProvider = new DocumentProvider();
            _resourceTileProvider = new ResourceTileProvider();
            _selectionFilterPageProvider = new SelectionFilterPageProvider();
        }

        public InsightsAndResourcesController(ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
            IInsightsResourcesProvider insightsAndResourcesPageProvider,
            IDocumentTypeProvider documentTypeProvider,
            IDocumentProvider documentProvider,
            IResourceTileProvider resourceTileProvider,
            ISelectionFilterPageProvider selectionFilterPageProvider)
        {
            _solutionBusinessUnitProvider = solutionBusinessUnitProvider;
            _insightsAndResourcesPageProvider = insightsAndResourcesPageProvider;
            _documentTypeProvider = documentTypeProvider;
            _documentProvider = documentProvider;
            _resourceTileProvider = resourceTileProvider;
            _selectionFilterPageProvider = selectionFilterPageProvider;
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
                    ViewAllLabel = page.ViewAllLabel,
                    ViewAllUrl = RouteHelper.GetSelectionFilterUrl(new SearchRequest { DocumentTypesIds = ConfigurationManager.AppSettings["DocumentDataSheetDocumentTypeId"] }),
                    Links = _solutionBusinessUnitProvider.GetSolutionBusinessUnits().Select(s => 
                    {
                        var childSelectionFilterPage = _selectionFilterPageProvider.GetChildSelectionFilterPage(s.NodeAlias);
                        return new LinkViewModel
                        {
                            Title = s.Title,
                            Reference = RouteHelper.GetSelectionFilterUrl(
                                new SearchRequest { SBUId = s.NodeID.ToString() }, childSelectionFilterPage != null ? childSelectionFilterPage.NodeAlias : null)
                        };
                    }).ToList()
                }
            };
            model.InsightsListing.AddRange(_documentTypeProvider.GetDocumentTypes().Select(s => new InsightsListingItemViewModel
            {
                Title = s.Title,
                ViewAllLabel = page.ViewAllLabel,
                ViewAllUrl = RouteHelper.GetSelectionFilterUrl(new SearchRequest { DocumentTypesIds = s.NodeID.ToString() }),
                Links = _documentProvider.GetHighlightedDocuments(s.Title).Select(document => new LinkViewModel
                {
                    Title = document.Title,
                    Reference = document.DocumentNamePath
                }).ToList()
            }));
            model.Tiles = new List<TileViewModel>
            {
                new TileViewModel 
                {
                    Title = page.StayInformedTileTitle,
                    Description = page.StayInformedTileDescription,
                    Reference = "/StayInformed"
                }
            };
            model.Tiles.AddRange(_resourceTileProvider.GetTiles(page.FeaturedContentList)
                .Select(s => Mapper.Map<TileViewModel>(s)).ToList());
            return View("~/Views/Afton/InsightsAndResources/Index.cshtml", model);
        }
    }
}