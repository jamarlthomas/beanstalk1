using System.Runtime.Remoting.Messaging;
using System.Web.Mvc;
using System.Web.Routing;
using CMS.DocumentEngine.Types;
using CMS.Helpers;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure;
using CMS.Mvc.Infrastructure.Localization;
using CMS.Mvc.Old_App_Code;
using CMS.WebAnalytics;


namespace CMS.Mvc.Controllers.Afton
{
    public class AuxiliaryController : BaseController
    {
        [Route("Auxiliary")]
        public ActionResult Index()
        {
            return View("~/Views/Afton/Auxiliary/Index.cshtml");
        }
        [Route("Auxiliary/ClearCache")]
        public ActionResult ClearCache()
        {
            CacheHelper.ClearCache();
            return View("~/Views/Afton/Auxiliary/Index.cshtml");
        }
        [Route("Auxiliary/ReloadRoutes")]
        public ActionResult ReloadRoutes()
        {
            CacheHelper.ClearCache();
            var routes = RouteTable.Routes;

            RouteConfig.SetUpRoutesFromKentico(routes);
            return View("~/Views/Afton/Auxiliary/Index.cshtml");
        }

        private void UpdateRoutes(RouteCollection routes)
        {

        }
    }
}