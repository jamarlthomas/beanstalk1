using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Home;
using System.Web.Mvc;
using System.Linq;
using System;
using System.Collections.Generic;
using CMS.DocumentEngine;
using CMS.Mvc.Helpers;

namespace CMS.Mvc.Controllers.Afton
{
    public class HomeController : BaseController
    {
        private readonly IHeroContentProvider _heroContentProvider;
        private readonly IHomeProvider _homeProvider;
        private readonly IPrimaryTilesProvider _primaryTilesProvider;
        public HomeController()
        {
            _heroContentProvider = new HeroContentProvider();
            _homeProvider = new HomeProvider();
            _primaryTilesProvider = new PrimaryTilesProvider();
        }

        public HomeController(IHeroContentProvider heroContentProvider,
            IHomeProvider homeProvider,
            IPrimaryTilesProvider primaryTilesProvider)
        {
            _heroContentProvider = heroContentProvider;
            _homeProvider = homeProvider;
            _primaryTilesProvider = primaryTilesProvider;
        }

        public ActionResult Index()
        {
            var model = new HomeViewModel
            {
                HeroContentList = MapData<HeroContent, HeroContentViewModel>(_heroContentProvider.GetHeroContentItems()).Where(w => !string.IsNullOrEmpty(w.Image)).ToList(),
                PrimaryTiles = new List<PrimaryTileViewModel>()
            };
            var home = _homeProvider.GetHomeItems().First();
            foreach (var primaryTile in _primaryTilesProvider.GetPrimaryTiles(home.ManagedBlocks.Split(';').Select(s => Guid.Parse(s)).ToList(), home.Site.DisplayName))
            {
				PrimaryTileViewModel tile = null;
                if (primaryTile is Document)
                {
					tile = MapData<Document, PrimaryTileViewModel>(primaryTile as Document);
					tile.TypeName = "Document";
                }
                else if (primaryTile is CustomNews)
                {
					tile = MapData<CustomNews, PrimaryTileViewModel>(primaryTile as CustomNews);
					tile.TypeName = "News";
                }
                else if (primaryTile is Event)
                {
					tile = MapData<Event, PrimaryTileViewModel>(primaryTile as Event);
					var separatedDescription = DivideHelper.SeparateText(tile.Description);
					tile.HeaderDescription = separatedDescription[0];
					tile.Description = separatedDescription[1];
					tile.TypeName = "Events";
                }
				if (tile != null)
				{
					model.PrimaryTiles.Add(tile);
				}
            }
            return View("~/Views/Afton/Home/Index.cshtml", model);
        }
    }
}