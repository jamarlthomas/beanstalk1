using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CMS.Mvc.Interfaces;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;

namespace CMS.Mvc.Providers
{
    public class PrivacyTermsCookieProvider : IPrivacyTermsCookieProvider
    {
        public Privacyconstants GetTermsAndCookiesPage()
        {
            return ContentHelper.GetDoc<Privacyconstants>( Privacyconstants.CLASS_NAME );
        }
    }
}