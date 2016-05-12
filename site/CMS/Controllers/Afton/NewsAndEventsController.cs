using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.NewsAndEvents;
using CMS.Mvc.ViewModels.Shared;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class NewsAndEventsController : BaseController
    {
        private readonly INewsAndEventsPageProvier _newsAndEventsPageProvier;
        private readonly ITreeNodesProvider _treeNodesProvider;

        public NewsAndEventsController()
        {
            _newsAndEventsPageProvier = new NewsAndEventsPageProvier();
            _treeNodesProvider = new TreeNodesProvider();
        }

        public NewsAndEventsController(INewsAndEventsPageProvier newsAndEventsPageProvier,
            ITreeNodesProvider treeNodesProvider)
        {
            _newsAndEventsPageProvier = newsAndEventsPageProvier;
            _treeNodesProvider = treeNodesProvider;
        }

        [PageVisitActivity]
        public ActionResult Index(NewsAndEventsRequest request)
        {
            var page = _newsAndEventsPageProvier.GetNewsAndEventsPage();
            var model = MapData<NewsAndEventsPage, NewsAndEventsPageViewModel>(page);

            model.Types = _newsAndEventsPageProvier.GetDocumentTypes(page, request.Category);

            var recordsOnPage = Int32.Parse(ConfigurationManager.AppSettings["NewsEventsBlogsRecordOnPageCount"]);
            
            var contentList = _newsAndEventsPageProvier.GetContentList(page, request).ToList();
            if (!String.Equals(request.SortOrder, "DESC", StringComparison.OrdinalIgnoreCase))
            {
                contentList.Reverse();
            }
            List<DateTime> Dates = contentList.Select(x => Convert.ToDateTime(x.GetStringValue("Date", ""))).ToList();
            List<string> MonthDate = Dates.Select(y => y.ToString("MMM yy")).Distinct().ToList();
            if (!MonthDate.Contains(request.DateFilter)&&!string.IsNullOrEmpty(request.DateFilter)) {
                request.DateFilter = MonthDate.First();
            }
            model.NewsAndEventsList = contentList
                .Where(x=>!string.IsNullOrEmpty(request.DateFilter) ?
                    (Convert.ToDateTime(x.GetStringValue("Date","")).ToString("MMM yy")==request.DateFilter):1==1)
                .Skip((request.Page - 1) * recordsOnPage ?? 0)
                .Take(recordsOnPage)
                .Select(AutoMapper.Mapper.Map<NewsAndEventViewModel>).ToList();
            foreach (var item in model.NewsAndEventsList)
            {
                //item.Date = UtilsHelper.ConvertToCST(item.Date);
            }
 
            model.Dates = MonthDate;
            model.Pagination = GetPagination((int)Math.Ceiling((double)contentList.Count / recordsOnPage), request.Page);
            model.SelectedSortOrder = request.SortOrder;

            model.Tiles = _treeNodesProvider
                .GetTreeNodes(page.ContentManagedTiles).Take(4).Select(tile => AutoMapper.Mapper.Map<TileViewModel>(tile)).ToList();
            return View("~/Views/Afton/NewsAndEvents/Index.cshtml", model);
        }

        private PaginationViewModel GetPagination(int totalPages, int? page)
        {
            return new PaginationViewModel
            {
                TotalPages = totalPages,
                CurrentPage = page ?? 1,
                BaseUrl = UtilsHelper.GetBaseUrlWithoutIntParam(Request.Url.PathAndQuery, "page"),
                PageArgName = "page"
            };
        }
    }
}
