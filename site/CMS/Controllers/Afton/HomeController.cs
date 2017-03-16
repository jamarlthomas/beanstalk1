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
            foreach(var item in model.HeroContentList) {
                var parseGuid = Guid.Parse(item.RelatedDocument);
                var nodeId = CMS.DocumentEngine.TreePathUtils.GetNodeIdByNodeGUID(parseGuid, SiteProvider.SiteContext.CurrentSiteName);
                var getDoc = new CMS.DocumentEngine.TreeProvider().SelectSingleNode( nodeId, Localization.LocalizationContext.PreferredCultureCode );

                item.RelatedDocument = getDoc.GetType().GetProperty("DocumentRoutePath").GetValue(getDoc).ToString();
            }
            var home = _homeProvider.GetHomePage();
            var primaryTilesNodes = home.Fields.ManagedBlocks2.Take(3).AsQueryable();
            var primaryTilesModels = new List<PersonalizedTile>();

            primaryTilesNodes.ForEach(item =>
            {
                var pt = new PersonalizedTile();
                pt.Load(item);
                primaryTilesModels.Add(pt);
            });


            //avoid duplicates here
            model.PrimaryTiles = MapData<PersonalizedTile, PersonalizationCardViewModel>(primaryTilesModels);
            model.PrimaryTiles.ForEach( x =>
            {
                if ( x.TypeName == CustomNews.CLASS_NAME || x.TypeName == Event.CLASS_NAME )
                {
                    x.Date = (DateTime)x.Item.GetValue( "Date" );
                }
                if ( !string.IsNullOrEmpty( x.HomeTitle ) )
                {
                    x.Title = x.HomeTitle;
                }
            } );
            var filteredPersTiles = _personalizationProvider.GetPersonalizedItems()
                .Where(item => !primaryTilesNodes.Select(pt => pt.NodeID).Contains(item.Item.NodeID))
                .Take(3)
                .ToList();
            model.PersonalizedTiles = MapData<PersonalizedTile, PersonalizationCardViewModel>(filteredPersTiles);
            model.PersonalizedTiles.ForEach( x =>
            {
                if ( x.TypeName == CustomNews.CLASS_NAME || x.TypeName == Event.CLASS_NAME )
                {
                    x.Date = ( DateTime )x.Item.GetValue( "Date" );
                }
                if ( !string.IsNullOrEmpty( x.HomeTitle ) )
                {
                    x.Title = x.HomeTitle;
                }
            } );

            //exclude duplicates from first two lines
            var filteredTrendingTiles = _personalizationProvider
                .GetTrendingTiles()
                .Where(item => !primaryTilesNodes.Select(pt => pt.NodeID).Contains(item.Item.NodeID) && !filteredPersTiles.Select(pt => pt.NodeID).Contains(item.Item.NodeID))
                .Where(item=>item.ClassName!=Home.CLASS_NAME||item.ClassName!=ContactPage.CLASS_NAME||item.ClassName!=InsightsResources.CLASS_NAME||item.ClassName!=DocumentType.CLASS_NAME||item.ClassName!=ATCToolsPage.CLASS_NAME||item.ClassName!=Term.CLASS_NAME||item.ClassName!=FAQTopic.CLASS_NAME||item.ClassName!=FAQItem.CLASS_NAME)
                .Take(3)
                .ToList();
            
            model.TrendingTiles = MapData<PersonalizedTile, PersonalizationCardViewModel>(filteredTrendingTiles);
            model.TrendingTiles.ForEach( x =>
            {
                if ( x.TypeName == CustomNews.CLASS_NAME || x.TypeName == Event.CLASS_NAME )
                {
                    x.Date = ( DateTime )x.Item.GetValue( "Date" );
                }
                if ( !string.IsNullOrEmpty( x.HomeTitle ) )
                {
                    x.Title = x.HomeTitle;
                }
            } );
            if ( System.Configuration.ConfigurationManager.AppSettings[ "DateOnCards" ] == "false" )
            {
                //Remove Date from Home Cards
                model.PrimaryTiles.Where( x => x.TypeName != CustomNews.CLASS_NAME && x.TypeName != Event.CLASS_NAME ).ForEach( x => x.Date = null );
                model.PersonalizedTiles.Where( x => x.TypeName != CustomNews.CLASS_NAME && x.TypeName != Event.CLASS_NAME).ForEach( x => x.Date = null );
                model.TrendingTiles.Where( x => x.TypeName != CustomNews.CLASS_NAME && x.TypeName != Event.CLASS_NAME ).ForEach( x => x.Date = null );
            }

         
            return View("~/Views/Afton/Home/Index.cshtml", model);
        }

      
    }
}