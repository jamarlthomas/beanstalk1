using System.Globalization;

namespace Infrastructure.Localization
{
    public interface IRouteValueTranslationProvider
    {
        TranslationItem TranslateTo(CultureInfo culture, string defaultCultureValue);
        TranslationItem TranslateFrom(CultureInfo culture, string defaultCultureValue);
    }
}
