using System.Web.Mvc;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure;
using CMS.Mvc.Infrastructure.Localization;

namespace CMS.Mvc.Controllers.Afton
{
    public class AuxiliaryController : BaseController
    {
        [Route("Auxiliary")]
        public ActionResult Index()
        {
            //var translProvider = RouteValueTranslationProvider.GetProvider();
            //TranslationsUtility.LoadTranslations(translProvider);

            ContentHelper.GetDocByName<PagesMenuItem>(PagesMenuItem.CLASS_NAME, "About");
            return View("~/Views/Afton/Auxiliary/Index.cshtml");
        }
    }
}