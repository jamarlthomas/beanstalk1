using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CMS.Mvc.ViewModels.PrivacyTermsCookie;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Controllers.Afton
{
    public class PrivacyTermsCookieController : BaseController
    {
        private readonly IPrivacyTermsCookieProvider _privacyTermsProvider;
        // GET: PrivacyTermsCookie
        public PrivacyTermsCookieController()
        {
            _privacyTermsProvider = new PrivacyTermsCookieProvider();
        }
        public ActionResult Index()
        {
            var model = MapData<Privacyconstants, PrivacyTermCookieViewModel>( _privacyTermsProvider.GetTermsAndCookiesPage() );
            return View( "~/Views/Afton/PrivacyTermsCookie/Index.cshtml", model );
        }
    }
}