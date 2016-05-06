using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Home;
using CMS.Mvc.ViewModels.Shared.Personalization;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using WebGrease.Css.Extensions;

namespace CMS.Mvc.Controllers.Afton
{
    public class HomeController : BaseController
    {
        private readonly IHeroContentProvider _heroContentProvider;
        private readonly IHomeProvider _homeProvider;
        private readonly IPersonalizationProvider _personalizationProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;
        public HomeController()
        {
            _heroContentProvider = new HeroContentProvider();
            _homeProvider = new HomeProvider();
            _personalizationProvider = new PersonalizationProvider();
            _treeNodesProvider = new TreeNodesProvider();
        }

        public HomeController(IHeroContentProvider heroContentProvider,
            IHomeProvider homeProvider,
            ITreeNodesProvider treeNodesProvider,
            IPersonalizationProvider personalisationProvider)
        {
            _heroContentProvider = heroContentProvider;
            _homeProvider = homeProvider;
            _treeNodesProvider = treeNodesProvider;
            _personalizationProvider = personalisationProvider;
        }

        [PageVisitActivity]
        public ActionResult Index()
        {
            var model = new HomeViewModel
            {
                HeroContentList = MapData<HeroContent, HeroContentViewModel>(_heroContentProvider.GetHeroContentItems()).Where(w => !string.IsNullOrEmpty(w.Image)).ToList(),
                PrimaryTiles = new List<PersonalizationCardViewModel>()
                
            };
            var home = _homeProvider.GetHomePage();
            var primaryTilesNodes = _treeNodesProvider.GetTreeNodes(home.ManagedBlocks).Take(3).AsQueryable();
            var primaryTilesModels = new List<PersonalizedTile>();
            primaryTilesNodes.ForEach(item =>
            {
                var pt = new PersonalizedTile();
                pt.Load(item);
                primaryTilesModels.Add(pt);
            });


            //avoid duplicates here
            model.PrimaryTiles = MapData<PersonalizedTile, PersonalizationCardViewModel>(primaryTilesModels);
            var filteredPersTiles = _personalizationProvider.GetPersonalizedItems()
                .Where(item => !primaryTilesNodes.Select(pt => pt.NodeID).Contains(item.Item.NodeID))
                .Take(3)
                .ToList();
            model.PersonalizedTiles = MapData<PersonalizedTile, PersonalizationCardViewModel>(filteredPersTiles);


            //exclude duplicates from first two lines
            var filteredTrendingTiles = _personalizationProvider
                .GetTrendingTiles()
                .Where(item => !primaryTilesNodes.Select(pt => pt.NodeID).Contains(item.Item.NodeID) && !filteredPersTiles.Select(pt => pt.NodeID).Contains(item.Item.NodeID))
                .Take(3)
                .ToList();

            model.TrendingTiles = MapData<PersonalizedTile, PersonalizationCardViewModel>(filteredTrendingTiles);

         
            return View("~/Views/Afton/Home/Index.cshtml", model);
        }

      
    }
}