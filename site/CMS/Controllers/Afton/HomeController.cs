using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Home;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class HomeController : BaseController
    {
        private readonly IHeroContentProvider _heroContentProvider;
        private readonly IHomeProvider _homeProvider;
        private readonly ITilesProvider _tilesProvider;
        public HomeController()
        {
            _heroContentProvider = new HeroContentProvider();
            _homeProvider = new HomeProvider();
            _tilesProvider = new TilesProvider();
        }

        public HomeController(IHeroContentProvider heroContentProvider,
            IHomeProvider homeProvider,
            ITilesProvider tilesProvider)
        {
            _heroContentProvider = heroContentProvider;
            _homeProvider = homeProvider;
            _tilesProvider = tilesProvider;
        }

        public ActionResult Index()
        {
            var model = new HomeViewModel
            {
                HeroContentList = MapData<HeroContent, HeroContentViewModel>(_heroContentProvider.GetHeroContentItems()).Where(w => !string.IsNullOrEmpty(w.Image)).ToList(),
                PrimaryTiles = new List<TileViewModel>()
            };
            var home = _homeProvider.GetHomeItems().First();
			foreach (var primaryTile in _tilesProvider.GetTiles(UtilsHelper.ParseGuids(home.ManagedBlocks)))
            {
				var tile = AutoMapper.Mapper.Map<TileViewModel>(primaryTile);
                if (primaryTile is Document)
                {
					tile.TypeName = "Document";
                }
                else if (primaryTile is CustomNews)
                {
					tile.TypeName = "News";
                }
                else if (primaryTile is Event)
                {
					tile.TypeName = "Events";
                }
                else if (primaryTile is Solution)
                {
                    tile.TypeName = "Solution";
                }
				if (tile != null)
				{
					model.PrimaryTiles.Add(tile);
				}
            }
			for (int i = 2; i < model.PrimaryTiles.Count; i+=3)//mock for tranding topics
			{
				model.PrimaryTiles[i].IsTrending = true;
			}
            return View("~/Views/Afton/Home/Index.cshtml", model);
        }
    }
}