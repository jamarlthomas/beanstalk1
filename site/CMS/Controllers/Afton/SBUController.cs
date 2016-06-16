﻿using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.SBU;
using CMS.Mvc.ViewModels.Shared;
using System.Linq;
using System.Web.Mvc;
using System.Collections.Generic;

namespace CMS.Mvc.Controllers.Afton
{
    public class SBUController : BaseController
    {
        private readonly ISolutionBusinessUnitProvider _solutionBusinessUnitProvider;
        private readonly IDocumentProvider _documentProvider;
        private readonly IFAQItemProvider _FAQItemProvider;
        private readonly IDocumentTypeProvider _documentTypeProvider;
        private readonly ISolutionProvider _solutionProvider;
        private readonly IProductProvider _productProvider;
        private readonly IGenericPageProvider _genericPageProvider;

        public SBUController()
        {
            _solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
            _documentProvider = new DocumentProvider();
            _FAQItemProvider = new FAQItemProvider();
            _documentTypeProvider = new DocumentTypeProvider();
            _solutionProvider = new SolutionProvider();
            _productProvider = new ProductProvider();
            _genericPageProvider = new GenericPageProvider();

        }

        public SBUController(ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
            IDocumentProvider documentProvider,
            IFAQItemProvider FAQItemProvider,
            IDocumentTypeProvider documentTypeProvider,
            ISolutionProvider solutionProvider,
            IProductProvider productProvider,
            IGenericPageProvider genericPageProvider)
        {
            _solutionBusinessUnitProvider = solutionBusinessUnitProvider;
            _documentProvider = documentProvider;
            _FAQItemProvider = FAQItemProvider;
            _documentTypeProvider = documentTypeProvider;
            _solutionProvider = solutionProvider;
            _productProvider = productProvider;
        }
        [PageVisitActivity]
        [OutputCache(Duration=600, VaryByParam="none")]
        public ActionResult Index(string SBUName)
        {
            var sbu = _solutionBusinessUnitProvider.GetSolutionBusinessUnit(SBUName);
            var model = MapData<SolutionBusinessUnit, CMS.Mvc.ViewModels.Shared.SBUViewModel>(sbu);
            var solutionGuidList = _solutionProvider.GetSolutions(SBUName).Select(item => item.DocumentGUID);
            var solutionIds = string.Join(",", _solutionProvider.GetSolutions(SBUName).Select(item => item.NodeID));
            model.FAQs = MapData<FAQItem, FAQItemViewModel>(_FAQItemProvider.GetFAQItemsBySBU(sbu.DocumentGUID.ToString()));
            model.DocumentTypes = new System.Collections.Generic.List<DocumentTypeViewModel>();
            model.ViewAllDocumentsLink = RouteHelper.GetSelectionFilterUrl(new SelectionFilterSearchRequest()
            {
                SolutionsIds = solutionIds
            });
            model.DocumentTypes.AddRange(MapData<DocumentType, DocumentTypeViewModel>(_documentTypeProvider.GetDocumentTypes()));

            foreach (var item in model.DocumentTypes)
            {

                    switch (item.Title)
                    {
                        case "Product Data Sheets":
                            item.Documents = _productProvider.GetProductsBySBU(sbu.NodeAlias).Select(document => new LinkViewModel
                            {
                                Title = document.Title,
                                Reference = document.DocumentRoutePath
                            }).Take(5).ToList();
                            break;
                        case "Brochures":
                        case "New Products":
                            // GenericPages
                            item.Documents = _genericPageProvider.GetChildGenericPages(item.Title)
                                .Where(x => (UtilsHelper.ParseGuids(x.RelatedSolution).Intersect(solutionGuidList).Count() > 0))
                                .Select(document => new LinkViewModel
                            {
                                Title = document.Title,
                                Reference = document.DocumentRoutePath
                            }).Distinct().Take(5).ToList();
                            break;
                        default:
                            // Product Stewardship Summary, Article, Whitepaper -- must be a Document
                            item.Documents = _documentProvider.GetDocuments(item.Title)
                                .Where(x => (UtilsHelper.ParseGuids(x.RelatedSolution).Intersect(solutionGuidList).Count() > 0))
                                .Select(document => new LinkViewModel
                            {
                                Title = document.Title,
                                Reference = document.DocumentRoutePath
                            }).Distinct().Take(5).ToList();
                            break;
                    }
                    item.ViewAllUrl = RouteHelper.GetSBUSelectionFilterViewAllURL(ContentHelper.GetDocByName<DocumentType>(DocumentType.CLASS_NAME,item.Title).NodeID.ToString(), solutionIds);
                //}
                
            }
            

            model.Solutions = MapData<Solution, TileViewModel>(_solutionProvider.GetSolutions(SBUName)).Where(w => !string.IsNullOrEmpty(w.HomeImage)).ToList();
            return View("~/Views/Afton/SBU/Index.cshtml", model);
        }
    }
}
