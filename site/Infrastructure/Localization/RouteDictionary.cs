using System.Collections.Generic;
using System.Globalization;

namespace Infrastructure.Localization
{
    public class RouteDictionary
    {
        public CultureInfo Culture { get; set; }
        public Dictionary<string, string> TranslationDictionary;

        public RouteDictionary(CultureInfo culture)
        {
            Culture = culture;
        }

        public RouteDictionary(string cultureName)
        {
            Culture = new CultureInfo(cultureName);
        }
    }
}
