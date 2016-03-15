using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
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
        private readonly ITilesProvider _tilesProvider;

        public NewsAndEventsController()
        {
            _newsAndEventsPageProvier = new NewsAndEventsPageProvier();
            _tilesProvider = new TilesProvider();
        }

        public NewsAndEventsController(INewsAndEventsPageProvier newsAndEventsPageProvier,
            ITilesProvider tilesProvider)
        {
            _newsAndEventsPageProvier = newsAndEventsPageProvier;
            _tilesProvider = tilesProvider;
        }

        public ActionResult Index()
        {
            var page = _newsAndEventsPageProvier.GetNewsAndEventsPages().First();
            var model = MapData<NewsAndEventsPage, NewsAndEventsPageViewModel>(page);

            model.Tiles = _tilesProvider
                .GetTiles(UtilsHelper.ParseGuids(page.ContentManagedTiles)).Select(tile => AutoMapper.Mapper.Map<TileViewModel>(tile)).ToList();
            return View("~/Views/Afton/NewsAndEvents/Index.cshtml", model);
        }
    }
}
