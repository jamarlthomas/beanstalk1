using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class ErrorController : Controller
    {
        public ViewResult Index()
        {
            Response.TrySkipIisCustomErrors = true;
            return View("~/Views/Afton/Shared/Error.cshtml");
        }
	}
}