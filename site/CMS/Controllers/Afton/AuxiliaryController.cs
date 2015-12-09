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

            //var a = ContentHelper.GetDocByName<Product>(Product.CLASS_NAME, "Sample-product-1");
            var b = ContentHelper.GetDocs<Product>(Product.CLASS_NAME);
            return View("~/Views/Afton/Auxiliary/Index.cshtml");
        }
    }
}