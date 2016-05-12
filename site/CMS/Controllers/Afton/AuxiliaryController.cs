using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;
using CMS.DocumentEngine.Types;
using CMS.Helpers;
using CMS.Mvc.Helpers;
using CMS.Mvc.Old_App_Code;
using CMS.Mvc.Old_App_Code.CustomActions;
using CMS.Mvc.ViewModels.Auxiliary;

namespace CMS.Mvc.Controllers.Afton
{
    public class AuxiliaryController : BaseController
    {
        [Route("Auxiliary")]
        public ActionResult Index()
        {
            AuxiliryViewModel model= new AuxiliryViewModel();
            model.Home = new AuxiliaryHyperlink("Home", "");
            model.SBUs = ContentHelper.GetDocs<SolutionBusinessUnit>(SolutionBusinessUnit.CLASS_NAME)
                .Where(sbu=>sbu.Parent.NodeAlias == "Home")
                .Select(item => new AuxiliaryHyperlink(item.Title, item.DocumentRoutePath)).ToList();
            model.Solutions = ContentHelper.GetDocs<Solution>(Solution.CLASS_NAME).Select(item => new AuxiliaryHyperlink(item.Title, item.DocumentRoutePath)).ToList();
            model.Products = ContentHelper.GetDocs<Product>(Product.CLASS_NAME).Select(item => new AuxiliaryHyperlink(item.Title, item.DocumentRoutePath)).ToList();
            model.Documents = ContentHelper.GetDocs<Document>(Document.CLASS_NAME).Select(item => new AuxiliaryHyperlink(item.Title, item.DocumentRoutePath)).ToList();
            model.News = ContentHelper.GetDocs<CustomNews>(CustomNews.CLASS_NAME).Select(item => new AuxiliaryHyperlink(item.Title, item.DocumentRoutePath)).ToList();
            model.BlogPosts = ContentHelper.GetDocs<BlogPost>(BlogPost.CLASS_NAME).Select(item => new AuxiliaryHyperlink(item.BlogPostTitle, item.DocumentRoutePath)).ToList();
            model.Offices = ContentHelper.GetDocs<Region>(Region.CLASS_NAME).Select(item => new AuxiliaryHyperlink(item.Title + " office", item.DocumentRoutePath)).ToList();
            model.NewsAndEvents = new AuxiliaryHyperlink(RouteHelper.GetRoute("NewsAndEvents").Page , RouteHelper.GetRoute("NewsAndEvents").Route);
            model.FAQ = new AuxiliaryHyperlink(RouteHelper.GetRoute("FAQ").Page, RouteHelper.GetRoute("FAQ").Route);
            model.GATC = new AuxiliaryHyperlink(RouteHelper.GetRoute("ATCTools").Page, RouteHelper.GetRoute("ATCTools").Route);
            model.SearchFilter = new AuxiliaryHyperlink(RouteHelper.GetRoute("SelectionFilterPage").Page, RouteHelper.GetRoute("SelectionFilterPage").Route);
            model.Blogs = new AuxiliaryHyperlink(RouteHelper.GetRoute("Blogs").Page, RouteHelper.GetRoute("Blogs").Route);
            model.Contact = new AuxiliaryHyperlink(RouteHelper.GetRoute("ContactPage").Page, RouteHelper.GetRoute("ContactPage").Route);
            model.RateContentResults = new AuxiliaryHyperlink(RouteHelper.GetRoute("RateContentResults").Page, RouteHelper.GetRoute("RateContentResults").Route);
            model.Insights = new AuxiliaryHyperlink(RouteHelper.GetRoute("Insights And Resources").Page, RouteHelper.GetRoute("Insights And Resources").Route);
            model.GlobalSearch = new AuxiliaryHyperlink(RouteHelper.GetRoute("GlobalSearch").Page, RouteHelper.GetRoute("GlobalSearch").Route);
            model.TermsAndAcronyms = new AuxiliaryHyperlink(RouteHelper.GetRoute("TermsAndAcronyms").Page, RouteHelper.GetRoute("TermsAndAcronyms").Route);
            model.Generic = ContentHelper.GetDocs<GenericPage>(GenericPage.CLASS_NAME).Select(item => new AuxiliaryHyperlink(item.Title, item.DocumentRoutePath)).ToList();
            return View("~/Views/Afton/Auxiliary/Index.cshtml", model);
        }

        [Route("Auxiliary/Infrastructure")]
        public ActionResult Infrastructure()
        {
            return View("~/Views/Afton/Auxiliary/Infrastructure.cshtml");
        }
        [Route("Auxiliary/ClearCache")]
        public ActionResult ClearCache()
        {
            CacheHelper.ClearCache();
            return RedirectToAction("Infrastructure");
        }
        [Route("Auxiliary/ReloadRoutes")]
        public ActionResult ReloadRoutes()
        {
            CacheHelper.ClearCache();
            var routes = RouteTable.Routes;

            RouteConfig.SetUpRoutesFromKentico(routes);
            return RedirectToAction("Index");
        }

        [Route("Auxiliary/Pdf")]
        public ActionResult Pdf()
        {
            var gpdf = new GeneratePdf();
            gpdf.Execute();
            return RedirectToAction("Infrastructure");
        }
    }
}