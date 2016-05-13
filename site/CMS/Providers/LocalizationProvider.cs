using System;
using System.Collections.Generic;
using System.Linq;
using CMS.Helpers;
using CMS.Localization;
using CMS.Mvc.Interfaces;
using CMS.SiteProvider;

namespace CMS.Mvc.Providers
{
    public class LocalizationProvider: ILocalizationProvider
    {
        private List<CultureInfo> GetAvailableCulturesNotCached()
        {
            var cultureList = new List<CultureInfo>();
            var cultures = CultureSiteInfoProvider.GetSiteCultures(SiteContext.CurrentSiteName);
            foreach (CultureInfo cultureInfo in cultures)
            {
                cultureList.Add(cultureInfo);
            }
            
            return cultureList;
        }

        public List<CultureInfo> GetAvailableCultures()
        {
            return CacheHelper.Cache(cs => GetAvailableCulturesNotCached(), new CacheSettings(1440, "all_cultures"));
        }


        public string GetSiteCulture(string cultureCode)
        {
            var firstOrDefault = GetAvailableCultures()
                .FirstOrDefault(c => c.CultureCode.Equals(cultureCode, StringComparison.InvariantCultureIgnoreCase));
            return firstOrDefault != null ? firstOrDefault.CultureCode : null;
        }


        public void SetSiteCulture(string culture)
        {
            //CultureHelper.SetPreferredCulture(culture);
            CultureHelper.SetPreferredUICultureCode(culture);
        }


        public string GetCurrentCulture()
        {
            return LocalizationContext.CurrentCulture.CultureCode;
        }
    }
}
