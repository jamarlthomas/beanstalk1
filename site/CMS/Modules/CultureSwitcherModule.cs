 ﻿using System;
 ﻿using System.Web;
 ﻿using CMS.Mvc.Helpers;
 ﻿using CMS.Mvc.Interfaces;
 using CMS.Mvc.Providers;

namespace CMS.Mvc.Modules
{
    public class CultureSwitcherModule : IHttpModule
    {
        public void Dispose()
        {

        }

        private readonly ILocalizationProvider _localizationProvider = new LocalizationProvider();

        public void Init(HttpApplication context)
        {
            context.AcquireRequestState += SwitchCulture;
            context.BeginRequest += SwitchCulture;
        }

        private void SwitchCulture(object sender, EventArgs e)
        {
            if (HttpContext.Current != null)
            {
                var lang = HttpContext.Current.Request.QueryString["lang"];
                if (!string.IsNullOrWhiteSpace(lang))
                {
                    var culture = _localizationProvider.GetSiteCulture(lang);
                    if (culture != null && !culture.Equals(_localizationProvider.GetCurrentCulture()))
                    {
                        _localizationProvider.SetSiteCulture(culture);
                        ContentHelper.RedirectWithoutLanguageQueryString();
                    }
                    //check if culture is supported by site and switch if does
                }
            }

        }

    }
}