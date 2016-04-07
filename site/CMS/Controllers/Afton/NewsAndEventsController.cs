using System;
using System.Collections.Generic;
using System.Configuration;
using CMS.Mvc.Helpers;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.NewsAndEvents;
using CMS.Mvc.ViewModels.Shared;
using System.Linq;
using System.Web.Mvc;
using CMS.Mvc.Infrastructure.Models;

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

        public ActionResult Index(NewsAndEventsRequest request)
        {
            var page = _newsAndEventsPageProvier.GetNewsAndEventsPages().First();
            var model = MapData<NewsAndEventsPage, NewsAndEventsPageViewModel>(page);

            model.Types = new List<string>
            {
                page.AllNewsEventsSelectorValue,
                page.NewsSelectorValue,
                page.EventsSelectorValue,
            };

            var recordsOnPage = Int32.Parse(ConfigurationManager.AppSettings["NewsEventsBlogsRecordOnPageCount"]);

            var contentList = _treeNodesProvider
                .GetTreeNodes(page.NewsAndEvents)
                .Where(w => String.Equals(request.Type, "NEWS", StringComparison.OrdinalIgnoreCase) ? w is CustomNews :
                    !String.Equals(request.Type, "EVENTS", StringComparison.OrdinalIgnoreCase) || w is Event).ToList();
            model.NewsAndEventsList = contentList
                .Skip((request.Page - 1) * recordsOnPage ?? 0)
                .Take(recordsOnPage)
                .Select(s => AutoMapper.Mapper.Map<NewsAndEventViewModel>(s)).ToList();

            model.NewsAndEventsList = model.NewsAndEventsList.OrderBy(f => f.Date).ToList();
            if (!String.Equals(request.SortOrder, "DESC", StringComparison.OrdinalIgnoreCase))
            {
                model.NewsAndEventsList.Reverse();
            }

            foreach (var item in model.NewsAndEventsList)
            {
                item.Date = UtilsHelper.ConvertToCST(item.Date);
            }

            model.Pagination = new PaginationViewModel
            {
                TotalPages = (int)Math.Ceiling((double)contentList.Count / recordsOnPage),
                CurrentPage = request.Page ?? 1
            };
            model.SelectedSortOrder = request.SortOrder;

            model.Tiles = _treeNodesProvider
                .GetTreeNodes(page.ContentManagedTiles).Take(4).Select(tile => AutoMapper.Mapper.Map<TileViewModel>(tile)).ToList();
            return View("~/Views/Afton/NewsAndEvents/Index.cshtml", model);
        }
    }
}
