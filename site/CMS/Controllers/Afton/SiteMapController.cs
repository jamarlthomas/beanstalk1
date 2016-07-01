﻿using System.Linq;
using System.Collections.Generic;
using System.Web.Mvc;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.ViewModels.SiteMap;
using System.Collections.Generic;
using AutoMapper;

namespace CMS.Mvc.Controllers.Afton
{
    public class SiteMapController : BaseController
    {
        // GET: SiteMap
        [Route("SiteMap")]
        public ActionResult Index()
        {
            SiteMapViewModel model = CreateSiteMapModel();
            return View("~/Views/Afton/SiteMap/Index.cshtml", model);
        }

        public static SiteMapViewModel CreateSiteMapModel()
        {
            //Build the Solution View Model
            SiteMapViewModel model = new SiteMapViewModel();
            model.Home = new SiteMapHyperLink("Home", "",null);
            //Gather List
            //Build SBU, Solution List
            var SBUList = ContentHelper.GetDocs<SolutionBusinessUnit>(SolutionBusinessUnit.CLASS_NAME)
                .Where(sbu => sbu.Parent.NodeAlias == "Home").ToList();
            var solutionList = ContentHelper.GetDocs<Solution>(Solution.CLASS_NAME).ToList();
            var sbuSolutionList = new List<SiteMapHyperLink>();
            foreach ( var item in SBUList )
            {
                var solutionItems = solutionList.Where( solution => solution.Parent.NodeID == item.NodeID ).ToList();
                sbuSolutionList.Add( new SiteMapHyperLink( item.Title, item.DocumentRoutePath, solutionItems.Select( x => new SiteMapHyperLink( x.Title, x.DocumentRoutePath, null ) ) ) );
            }
            model.SBUs = sbuSolutionList;

            //Build Pages List
            var pagesList = new List<SiteMapHyperLink>();
            var parentList = new List<GenericPage>();
            var genericList = ContentHelper.GetDocs<GenericPage>( GenericPage.CLASS_NAME ).ToList();
            parentList.AddRange( genericList.Where( x => x.Parent.ClassName != GenericPage.CLASS_NAME && x.Parent.ClassName != DocumentType.CLASS_NAME ).ToList() );
            pagesList = GenerateMapGeneric(parentList, genericList);
            pagesList.Add( new SiteMapHyperLink( RouteHelper.GetRoute( "NewsAndEvents" ).Page, RouteHelper.GetRoute( "NewsAndEvents" ).Route, null ) );
            pagesList.Add( new SiteMapHyperLink( RouteHelper.GetRoute( "FAQ" ).Page, RouteHelper.GetRoute( "FAQ" ).Route, null ) );
            pagesList.Add( new SiteMapHyperLink( RouteHelper.GetRoute( "Insights And Resources" ).Page, RouteHelper.GetRoute( "Insights And Resources" ).Route, null ) );
            pagesList.Add( new SiteMapHyperLink( RouteHelper.GetRoute( "ContactPage" ).Page, RouteHelper.GetRoute( "ContactPage" ).Route, null ) );
            pagesList.Add( new SiteMapHyperLink( RouteHelper.GetRoute("Logistics and Supply").Page, RouteHelper.GetRoute("Logistics and Supply").Route, null ) );
            pagesList.Add( new SiteMapHyperLink( RouteHelper.GetRoute( "TermsAndAcronyms" ).Page, RouteHelper.GetRoute( "TermsAndAcronyms" ).Route, null ) );
            model.Pages = pagesList.AsEnumerable().OrderBy(x=>x.Text).ToList();


            //Build Offices List
            model.Offices = ContentHelper.GetDocs<Region>(Region.CLASS_NAME).Select(item => new SiteMapHyperLink(item.Title + " office", item.DocumentRoutePath, null)).ToList();

            //Grab Headings from Resource Keys
            model.PagesName = UtilsHelper.GetLocalizedString("sitemap_Pages");
            model.SBUName = UtilsHelper.GetLocalizedString("sitemap_SBUName");
            model.OfficesName = UtilsHelper.GetLocalizedString("sitemap_OfficesName");
            return model;
        }

        //Recursive function for Generic Pages
        public static List<SiteMapHyperLink> GenerateMapGeneric( List<GenericPage> parentList, List<GenericPage> childList ) 
        {
            var outputList =  new List<SiteMapHyperLink>();
            foreach ( var item in parentList)
            {
                var childItems = childList.Where( x => x.Parent.NodeID == item.NodeID ).ToList();
                if(childItems != null) {
                    outputList.Add( new SiteMapHyperLink(item.Title,item.DocumentRoutePath,GenerateMapGeneric(childItems,childList)) );
                }

            }
            return outputList.AsEnumerable().OrderBy(x=>x.Text).ToList();
        }
    }
}