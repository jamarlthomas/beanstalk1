using CMS.Mvc.ActionFilters;
using CMS.Mvc.Helpers;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.NewsAndEvents;
using CMS.Mvc.ViewModels.Shared;
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
        public ActionResult Index()
        {
            var page = _newsAndEventsPageProvier.GetNewsAndEventsPage();
            var model = MapData<NewsAndEventsPage, NewsAndEventsPageViewModel>(page);

            model.NewsAndEventsList = _treeNodesProvider
                .GetTreeNodes(page.NewsAndEvents).Select(s => AutoMapper.Mapper.Map<NewsAndEventViewModel>(s)).ToList();
            foreach (var item in model.NewsAndEventsList)
            {
                item.Date = UtilsHelper.ConvertToCST(item.Date);
            }

            model.Tiles = _treeNodesProvider
                .GetTreeNodes(page.ContentManagedTiles).Take(4).Select(tile => AutoMapper.Mapper.Map<TileViewModel>(tile)).ToList();
            return View("~/Views/Afton/NewsAndEvents/Index.cshtml", model);
        }
    }
}
