using System;
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
    public class GlobalSearchController : BaseController
    {
        private readonly IGlobalSearchProvider _globalSearchProvider;
        private readonly IGlobalSearchPageProvider _globalSearchPageProvider;
        
        public GlobalSearchController()
        {
            _globalSearchProvider = new GlobalSearchProvider();
            _globalSearchPageProvider = new GlobalSearchPageProvider();
        }

        public GlobalSearchController(IGlobalSearchProvider globalSearchProvider,
            IGlobalSearchPageProvider globalSearchPageProvider)
        {
            _globalSearchProvider = globalSearchProvider;
            _globalSearchPageProvider = globalSearchPageProvider;
        }

        //[Route("filter/regions/{Regions}/documents/{DocumentTypesIds}/SBU/{SBUId}/solutions/{SolutionsIds}")]
        public JsonResult SearchAction(SelectionFilterSearchRequest request)
        {
            return Json(Search(request), JsonRequestBehavior.AllowGet);
        }

        public ActionResult Index(string name)
        {
            var result = _globalSearchProvider.PerformSearch(new GlobalSearchRequest
            {
                Query = name
            });
            //model.SearchResults = Search(searchRequest);

            return View("~/Views/Afton/SelectionFilter/Index.cshtml", new TileViewModel());
        }

        private SelectionFilterSearchViewModel Search(SelectionFilterSearchRequest request)
        {
            throw new Exception();
        }
    }
}