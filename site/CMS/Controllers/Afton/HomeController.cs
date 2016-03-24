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
        private readonly IPersonalisationProvider<Document> _personalisationProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;
        public HomeController()
        {
            _heroContentProvider = new HeroContentProvider();
            _homeProvider = new HomeProvider();
            _personalisationProvider = new PersonalisationProvider<Document>();
            _treeNodesProvider = new TreeNodesProvider();
        }

        public HomeController(IHeroContentProvider heroContentProvider,
            IHomeProvider homeProvider,
            ITreeNodesProvider treeNodesProvider,
            IPersonalisationProvider<Document> personalisationProvider)
        {
            _heroContentProvider = heroContentProvider;
            _homeProvider = homeProvider;
            _treeNodesProvider = treeNodesProvider;
            _personalisationProvider = personalisationProvider;
        }

        public ActionResult Index()
        {
            var model = new HomeViewModel
            {
                HeroContentList = MapData<HeroContent, HeroContentViewModel>(_heroContentProvider.GetHeroContentItems()).Where(w => !string.IsNullOrEmpty(w.Image)).ToList(),
                PrimaryTiles = new List<TileViewModel>(),
                TrendingTiles = new List<TileViewModel>() 
            };
            var home = _homeProvider.GetHomeItems().First();
			foreach (var primaryTile in _treeNodesProvider.GetTreeNodes(home.ManagedBlocks).Take(3))
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
            var persTiles = _personalisationProvider.GetPersonalizedItems().Take(3).ToArray();
            foreach (var persTile in persTiles)
            {
                var tile = AutoMapper.Mapper.Map<TileViewModel>(persTile);
                tile.TypeName = "Document";
                tile.IsTrending = true;
                model.TrendingTiles.Add(tile);
            }
            return View("~/Views/Afton/Home/Index.cshtml", model);
        }

      
    }
}