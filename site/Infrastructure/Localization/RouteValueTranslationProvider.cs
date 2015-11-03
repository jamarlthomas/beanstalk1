using System.Collections.Generic;
using System.Globalization;

namespace Infrastructure.Localization
{
    public class RouteValueTranslationProvider : IRouteValueTranslationProvider
    {
        private List<TranslationItem> Translations;

        public RouteValueTranslationProvider(List<TranslationItem> translations)
        {
            Translations = translations;
        }
        public TranslationItem TranslateTo(CultureInfo culture, string defaultCultureValue)
        {
            //implement translations to foreign language
            return new TranslationItem(culture, defaultCultureValue, defaultCultureValue);
        }

        public TranslationItem TranslateFrom(CultureInfo culture, string defaultCultureValue)
        {
            //implement translations to foreign language
            return new TranslationItem(culture, defaultCultureValue, defaultCultureValue);
        }
    }
}
