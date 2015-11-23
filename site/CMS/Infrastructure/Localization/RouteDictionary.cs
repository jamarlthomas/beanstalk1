using System.Collections.Generic;
using System.Globalization;

namespace CMS.Mvc.Infrastructure.Localization
{
    public class RouteDictionary
    {
        public CultureInfo Culture { get; set; }
        public Dictionary<string, string> TranslationDictionary = new Dictionary<string, string>();

        public RouteDictionary(CultureInfo culture)
        {
            Culture = culture;
        }

        public RouteDictionary(string cultureName)
        {
            Culture = new CultureInfo(cultureName);
        }

        public void AddPair(string defaultValue, string foreignValue)
        {
            TranslationDictionary.Add(defaultValue, foreignValue);
        }
    }
}
