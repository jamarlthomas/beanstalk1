using System.Globalization;

namespace CMS.Mvc.Infrastructure.Localization
{
    public class TranslationItem
    {
        public CultureInfo Culture { get; set; }
        public string DefaultCultureValue { get; set; }
        public string ForeignCultureValue { get; set; }

        public TranslationItem(CultureInfo culture, string defaultCultureValue, string foreignCultureValue)
        {
            Culture = culture;
            DefaultCultureValue = defaultCultureValue;
            ForeignCultureValue = foreignCultureValue;
        }
    }
}
