using CMS.DocumentEngine;
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
using CMS.Mvc.Helpers;
using System;

namespace CMS.Mvc.Controllers.Afton
{
    public class HomeController : BaseController
    {
        private readonly IHeroContentProvider _heroContentProvider;
        private readonly IHomeProvider _homeProvider;
        private readonly IPersonalizationProvider _personalisationProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;
        public HomeController()
        {
            _heroContentProvider = new HeroContentProvider();
            _homeProvider = new HomeProvider();
            _personalisationProvider = new PersonalizationProvider();
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
            _personalisationProvider = personalisationProvider;
        }

        [PageVisitActivity]
        public ActionResult Index()
        {
            var model = new HomeViewModel
            {
                HeroContentList = MapData<HeroContent, HeroContentViewModel>(_heroContentProvider.GetHeroContentItems()).Where(w => !string.IsNullOrEmpty(w.Image)).ToList(),
                PrimaryTiles = new List<PersonalizationCardViewModel>()
                
            };
            foreach(var item in model.HeroContentList) {
                var parseGuid = Guid.Parse(item.RelatedDocument);
                var nodeId = CMS.DocumentEngine.TreePathUtils.GetNodeIdByNodeGUID(parseGuid, SiteProvider.SiteContext.CurrentSiteName);
                var getDoc = new CMS.DocumentEngine.TreeProvider().SelectSingleNode(nodeId);
                //var getDoc = ContentHelper.GetDocByGuid<TreeNode>(parseGuid,SiteProvider.SiteContext.CurrentSiteName);
                item.RelatedDocument = getDoc.DocumentNamePath;
            }
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
            var filteredPersTiles = _personalisationProvider.GetPersonalizedItems()
                .Where(item => !primaryTilesNodes.Select(pt => pt.NodeID).Contains(item.Item.NodeID))
                .Take(3)
                .ToList();
            model.PersonalizedTiles = MapData<PersonalizedTile, PersonalizationCardViewModel>(filteredPersTiles);


            //exclude duplicates from first two lines
            var filteredTrendingTiles = _personalisationProvider
                .GetTrendingTiles()
                .Where(item => !primaryTilesNodes.Select(pt => pt.NodeID).Contains(item.Item.NodeID) && !filteredPersTiles.Select(pt => pt.NodeID).Contains(item.Item.NodeID))
                .Take(3)
                .ToList();

            model.TrendingTiles = MapData<PersonalizedTile, PersonalizationCardViewModel>(filteredTrendingTiles);

         
            return View("~/Views/Afton/Home/Index.cshtml", model);
        }

      
    }
}