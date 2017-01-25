using System.Collections.Generic;
using System;
using CMS.Mvc.ActionFilters;
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
        private readonly ISolutionProvider _solutionProvider;
        private readonly IGenericPageProvider _genericPageProvider;

        public InsightsAndResourcesController()
        {
            _solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
            _insightsAndResourcesPageProvider = new InsightsResourcesProvider();
            _documentTypeProvider = new DocumentTypeProvider();
            _documentProvider = new DocumentProvider();
            _resourceTileProvider = new ResourceTileProvider();
            _selectionFilterPageProvider = new SelectionFilterPageProvider();
            _solutionProvider = new SolutionProvider();
            _genericPageProvider = new GenericPageProvider();
        }

        public InsightsAndResourcesController(ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
            IInsightsResourcesProvider insightsAndResourcesPageProvider,
            IDocumentTypeProvider documentTypeProvider,
            IDocumentProvider documentProvider,
            IResourceTileProvider resourceTileProvider,
            ISelectionFilterPageProvider selectionFilterPageProvider,
            ISolutionProvider solutionProvider, IGenericPageProvider genericPageProvider)
        {
            _solutionBusinessUnitProvider = solutionBusinessUnitProvider;
            _insightsAndResourcesPageProvider = insightsAndResourcesPageProvider;
            _documentTypeProvider = documentTypeProvider;
            _documentProvider = documentProvider;
            _resourceTileProvider = resourceTileProvider;
            _selectionFilterPageProvider = selectionFilterPageProvider;
            _solutionProvider = solutionProvider;
            _genericPageProvider = genericPageProvider;
        }

        [PageVisitActivity]
        public ActionResult Index()
        {
            var page = _insightsAndResourcesPageProvider.GetInsightsResourcesPage();

            var model = MapData<InsightsResources, InsightsAndResourcesViewModel>(page);

            model.InsightsListing = GetInsightsListings(page);

            model.Tiles = GetTiles(page);

            return View("~/Views/Afton/InsightsAndResources/Index.cshtml", model);
        }

        private List<TileViewModel> GetTiles(InsightsResources page)
        {
            var result = _resourceTileProvider.GetTiles(page.FeaturedContentList).Select(s => Mapper.Map<TileViewModel>(s)).ToList();
            if (page.Fields.FeaturedContentList2.Count() > 0)
            {
                var guidString = string.Join(";", page.Fields.FeaturedContentList2.Select(x => x.NodeGUID.ToString()));
                result = _resourceTileProvider.GetTiles(guidString).Select(s => Mapper.Map<TileViewModel>(s)).ToList();
            }
            if ( System.Configuration.ConfigurationManager.AppSettings[ "DateOnCards" ] == "false" )
            {
                foreach(var card in result.Where(x=>x.TypeName!=CustomNews.CLASS_NAME&&x.TypeName!=Event.CLASS_NAME))
                {
                    card.Date = null;
                }
            }
            return result;
        }

        private List<InsightsListingItemViewModel> GetInsightsListings(InsightsResources page)
        {
            var result = new List<InsightsListingItemViewModel>
            {
                new InsightsListingItemViewModel
                {
                    Title = page.ProductDataSheetsTitle,
                    ViewAllLabel = page.ViewAllLabel,
                    NodeAlias = page.NodeAlias,
                    ViewAllUrl = RouteHelper.GetSelectionFilterViewAllUrl(ConfigurationManager.AppSettings["DocumentDataSheetDocumentTypeId"]),
                    Links = _solutionBusinessUnitProvider
                    .GetSolutionBusinessUnits()
                    .Select(MapSBUToLinkViewModel)
                    .ToList()
                }
            };
            result.AddRange(_documentTypeProvider.GetDocumentTypes().Where(x => x.NodeID != Int32.Parse(ConfigurationManager.AppSettings["DocumentDataSheetDocumentTypeId"])).Select(s => new InsightsListingItemViewModel
            {
                Title = s.Title,
                ViewAllLabel = page.ViewAllLabel,
                ViewAllUrl = RouteHelper.GetSelectionFilterViewAllUrl(s.NodeID.ToString()),
                NodeAlias = s.NodeAlias,
                Links = _documentProvider.GetHighlightedDocuments(s.NodeAlias).Select(document => new LinkViewModel
                {
                    Title = document.Title,
                    Reference = document.DocumentRoutePath
                })
                .ToList()
            }));
            result.ForEach(x => x.Links.AddRange(_genericPageProvider.GetHighlightedGenericPage(x.NodeAlias).Select(document => new LinkViewModel
                {
                    Title = document.Title,
                    Reference = document.DocumentRoutePath
                }).ToList()));
            foreach (var x in result)
            {
                //if (x.Title != page.ProductDataSheetsTitle)
                    x.Links = x.Links.OrderBy(l => l.Title).Take(5).ToList();
            }
            return result;
        }

        private LinkViewModel MapSBUToLinkViewModel(SolutionBusinessUnit sbu)
        {
            var childSelectionFilterPage = _selectionFilterPageProvider.GetChildSelectionFilterPage(sbu.NodeAlias);
            var searchRequest = new SelectionFilterSearchRequest
            {
                SolutionsIds = string.Join(",", _solutionProvider.GetSolutions(sbu.NodeAlias).Select(solution => solution.NodeID)),
                DocumentTypesIds = ConfigurationManager.AppSettings["DocumentDataSheetDocumentTypeId"]
            };
            return new LinkViewModel
            {
                Title = sbu.Title,
                Reference = RouteHelper.GetSelectionFilterUrl(searchRequest, childSelectionFilterPage != null ? childSelectionFilterPage.NodeAlias : null)
            };
        }
    }
}