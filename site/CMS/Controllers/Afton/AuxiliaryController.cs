using System.Runtime.Remoting.Messaging;
using System.Web.Mvc;
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
            //var gen = new GeneratePdf();
            //gen.Execute();
            //HitLogProvider.LogPageView();
            return View("~/Views/Afton/Auxiliary/Index.cshtml");
        }

        public ActionResult ClearCache()
        {
            CacheHelper.ClearCache();
            return View("~/Views/Afton/Auxiliary/Index.cshtml");
        }
    }
}