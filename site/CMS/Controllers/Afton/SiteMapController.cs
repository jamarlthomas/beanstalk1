﻿using System.Linq;
using System.Web.Mvc;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.ViewModels.SiteMap;

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
            SiteMapViewModel model = new SiteMapViewModel();

            model.Home = new SiteMapHyperLink("Home", "");
            model.SBUs = ContentHelper.GetDocs<SolutionBusinessUnit>(SolutionBusinessUnit.CLASS_NAME)
                .Where(sbu => sbu.Parent.NodeAlias == "Home")
                .Select(item => new SiteMapHyperLink(item.Title, item.DocumentRoutePath)).ToList();
            model.Solutions = ContentHelper.GetDocs<Solution>(Solution.CLASS_NAME).Select(item => new SiteMapHyperLink(item.Title, item.DocumentRoutePath)).ToList();
            model.Products = ContentHelper.GetDocs<Product>(Product.CLASS_NAME).Select(item => new SiteMapHyperLink(item.Title, item.DocumentRoutePath)).ToList();
            model.Documents = ContentHelper.GetDocs<Document>(Document.CLASS_NAME).Select(item => new SiteMapHyperLink(item.Title, item.DocumentRoutePath)).ToList();
            model.News = ContentHelper.GetDocs<CustomNews>(CustomNews.CLASS_NAME).Select(item => new SiteMapHyperLink(item.Title, item.DocumentRoutePath)).ToList();
            model.BlogPosts = ContentHelper.GetDocs<BlogPost>(BlogPost.CLASS_NAME).Select(item => new SiteMapHyperLink(item.BlogPostTitle, item.DocumentRoutePath)).ToList();
            model.Offices = ContentHelper.GetDocs<Region>(Region.CLASS_NAME).Select(item => new SiteMapHyperLink(item.Title + " office", item.DocumentRoutePath)).ToList();
            model.NewsAndEvents = new SiteMapHyperLink(RouteHelper.GetRoute("NewsAndEvents").Page, RouteHelper.GetRoute("NewsAndEvents").Route);
            model.FAQ = new SiteMapHyperLink(RouteHelper.GetRoute("FAQ").Page, RouteHelper.GetRoute("FAQ").Route);
            model.GATC = new SiteMapHyperLink(RouteHelper.GetRoute("ATCTools").Page, RouteHelper.GetRoute("ATCTools").Route);
            model.SearchFilter = new SiteMapHyperLink(RouteHelper.GetRoute("SelectionFilterPage").Page, RouteHelper.GetRoute("SelectionFilterPage").Route);
            model.Blogs = new SiteMapHyperLink(RouteHelper.GetRoute("Blogs").Page, RouteHelper.GetRoute("Blogs").Route);
            model.Contact = new SiteMapHyperLink(RouteHelper.GetRoute("ContactPage").Page, RouteHelper.GetRoute("ContactPage").Route);
            model.RateContentResults = new SiteMapHyperLink(RouteHelper.GetRoute("RateContentResults").Page, RouteHelper.GetRoute("RateContentResults").Route);
            model.Insights = new SiteMapHyperLink(RouteHelper.GetRoute("Insights And Resources").Page, RouteHelper.GetRoute("Insights And Resources").Route);
            model.GlobalSearch = new SiteMapHyperLink(RouteHelper.GetRoute("GlobalSearch").Page, RouteHelper.GetRoute("GlobalSearch").Route);
            model.TermsAndAcronyms = new SiteMapHyperLink(RouteHelper.GetRoute("TermsAndAcronyms").Page, RouteHelper.GetRoute("TermsAndAcronyms").Route);
            model.Generic = ContentHelper.GetDocs<GenericPage>(GenericPage.CLASS_NAME).Select(item => new SiteMapHyperLink(item.Title, item.DocumentRoutePath)).ToList();
            return model;
        }
    }
}