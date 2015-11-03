using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class HomeController : BaseController
    {
        // GET: Home
        public ActionResult Index()
        {
            return View("~/Views/Afton/Home/Index.cshtml");
        }
    }
}