using System.Collections.Generic;
using System.Globalization;

namespace CMS.Mvc.Infrastructure.Localization
{
    public interface IRouteValueTranslationProvider
    {
        TranslationItem TranslateTo(CultureInfo culture, string defaultCultureValue);
        TranslationItem TranslateFrom(CultureInfo culture, string foreignCultureValue);
        Dictionary<string, RouteDictionary> RouteDictionarySet { get; set; }
    }
}
