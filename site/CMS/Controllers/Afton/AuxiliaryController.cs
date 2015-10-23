using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class AuxiliaryController : BaseController
    {
        [Route("Auxiliary")]
        public ActionResult Index()
        {
            return View("~/Views/Afton/Auxiliary/Index.cshtml");
        }
    }
}