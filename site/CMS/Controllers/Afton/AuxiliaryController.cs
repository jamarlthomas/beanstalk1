using System.Web.Mvc;
using CMS.Mvc.Infrastructure;
using Infrastructure.Localization;

namespace CMS.Mvc.Controllers.Afton
{
    public class AuxiliaryController : BaseController
    {
        [Route("Auxiliary")]
        public ActionResult Index()
        {
            var translProvider = RouteValueTranslationProvider.GetProvider();
            Utility.LoadTranslations(translProvider);


            return View("~/Views/Afton/Auxiliary/Index.cshtml");
        }
    }
}