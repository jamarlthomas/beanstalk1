using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;

namespace Infrastructure.Localization
{
    public class RouteValueTranslationProvider : IRouteValueTranslationProvider
    {
        public Dictionary<string, RouteDictionary> RouteDictionarySet { get; set; }
        //public RouteValueTranslationProvider()
        //{ }
        
        private RouteValueTranslationProvider(Dictionary<string, RouteDictionary> routeDictionarySet)
        {
            RouteDictionarySet = routeDictionarySet;
        }
        public TranslationItem TranslateTo(CultureInfo culture, string defaultCultureValue)
        {
            var dict = GetRouteDictionary(culture);
            if (!dict.TranslationDictionary.ContainsKey(defaultCultureValue))
                return new TranslationItem(culture, defaultCultureValue, defaultCultureValue);
            var translation = dict.TranslationDictionary[defaultCultureValue];
            if (translation == null)
                throw new InvalidOperationException(string.Format("No translation for '{0}' to {1}", defaultCultureValue,  culture.DisplayName));
            
            return new TranslationItem(culture, defaultCultureValue, translation);
        }

        public TranslationItem TranslateFrom(CultureInfo culture, string foreignCultureValue)
        {
            // try to translate from specified culture.
            KeyValuePair<string, string> translationPair;
            if (culture != null)
            {
                var dict = GetRouteDictionary(culture);
                if (string.IsNullOrWhiteSpace(foreignCultureValue)) return new TranslationItem(culture, "", "");

                translationPair =
                    dict.TranslationDictionary.FirstOrDefault(
                        item => item.Value.Equals(foreignCultureValue, StringComparison.InvariantCultureIgnoreCase));
                if (!translationPair.Equals(default(KeyValuePair<string, string>)))
                {
                    return new TranslationItem(culture, translationPair.Key, foreignCultureValue);
                }
                //if value was not found return original one
                return new TranslationItem(culture, foreignCultureValue, foreignCultureValue);
            }

            //try to translate from any vocabulary containing this word
            foreach (KeyValuePair<string, RouteDictionary> routeDictionary in RouteDictionarySet)
            {
                translationPair =
                    routeDictionary.Value.TranslationDictionary.FirstOrDefault(
                        item => item.Value.Equals(foreignCultureValue, StringComparison.InvariantCultureIgnoreCase));
                if (!translationPair.Equals(default(KeyValuePair<string, string>)))
                {
                    return new TranslationItem(routeDictionary.Value.Culture, translationPair.Key, foreignCultureValue);
                }
            }
            // return current values w/o translation
            return new TranslationItem(culture, foreignCultureValue, foreignCultureValue);
        }

        private RouteDictionary GetRouteDictionary(CultureInfo culture)
        {
            var dict = RouteDictionarySet[culture.Name];
            if (dict == null)
                throw new InvalidOperationException(string.Format("Dictionary for {0} language has not been loaded", culture.DisplayName));
            return dict;
        }

        public static RouteValueTranslationProvider GetProvider()
        {
            Dictionary<string, RouteDictionary> dictSet = LoadDictionaries();

            var prv = new RouteValueTranslationProvider(dictSet);

            return prv;
        }

        private static Dictionary<string, RouteDictionary> LoadDictionaries()
        {
            var dictionarySet = new Dictionary<string, RouteDictionary>();
            var spanish = new RouteDictionary("es-ES");
            spanish.TranslationDictionary = new Dictionary<string, string>();
            spanish.TranslationDictionary.Add("Home", "Domicilio");
            spanish.TranslationDictionary.Add("Index", "Indexar");
            spanish.TranslationDictionary.Add("Auxiliary", "Asistente");
            spanish.TranslationDictionary.Add("Images", "Imágenes");
            dictionarySet.Add(spanish.Culture.Name, spanish);
            var english = new RouteDictionary("en-US");
            english.TranslationDictionary = new Dictionary<string, string>();
            english.TranslationDictionary.Add("Home", "Home");
            english.TranslationDictionary.Add("Index", "Index");
            english.TranslationDictionary.Add("Auxiliary", "Auxiliary");
            english.TranslationDictionary.Add("Images", "Images");
            dictionarySet.Add(english.Culture.Name, english);
            return dictionarySet;
        }
    }
}
