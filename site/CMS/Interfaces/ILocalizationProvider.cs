using System.Collections.Generic;
using CMS.Localization;

namespace CMS.Mvc.Interfaces
{
    public interface ILocalizationProvider
    {
        List<CultureInfo> GetAvailableCultures();

        string GetSiteCulture(string cultureCode);

        void SetSiteCulture(string culture);

        string GetCurrentCulture();
    }
}
