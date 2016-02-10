using System.Web.Mvc;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure;
using CMS.Mvc.Infrastructure.Localization;
using CMS.Mvc.Old_App_Code;


namespace CMS.Mvc.Controllers.Afton
{
    public class AuxiliaryController : BaseController
    {
        [Route("Auxiliary")]
        public ActionResult Index()
        {
            var gen = new GeneratePdf();
            gen.Execute();

            return View("~/Views/Afton/Auxiliary/Index.cshtml");
        }
    }
}