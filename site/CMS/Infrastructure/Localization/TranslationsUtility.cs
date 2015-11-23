using System;
using System.Collections.Generic;
using System.Linq;
using CMS.DocumentEngine;
using CMS.Mvc.Helpers;
using CultureInfo = System.Globalization.CultureInfo;

namespace CMS.Mvc.Infrastructure.Localization
{
    public class TranslationsUtility
    {
        internal static void LoadTranslations(RouteValueTranslationProvider translProvider)
        {

            var nodes = ContentHelper.GetAllNodes();
            translProvider.RouteDictionarySet = TranslationsUtility.GetTranslations(nodes);

        }

        private static Dictionary<string, RouteDictionary> GetTranslations(List<TreeNode> nodes)
        {
            if (!nodes.Any()) return null;
            var dictSet = new Dictionary<string, RouteDictionary>();
            foreach (TreeNode node in nodes)
            {
                var nodeAliases = node.Aliases.ToList();

                //get default(english?) value
                var defaultValue = node.NodeAlias;

                //load default(English vocabulary)
                var defCulture = new System.Globalization.CultureInfo("en-US");
                if (!dictSet.ContainsKey(defCulture.Name))
                {
                    dictSet.Add(defCulture.Name, new RouteDictionary(defCulture.Name));
                }
                RouteDictionary defDict = dictSet[defCulture.Name];
                if (defDict.TranslationDictionary.ContainsKey(defaultValue))
                {
                    defDict.TranslationDictionary[defaultValue] = defaultValue;
                }
                else
                {
                    defDict.TranslationDictionary.Add(defaultValue, defaultValue);
                }
                // load translations from aliases
                foreach (DocumentAliasInfo aliasInfo in node.Aliases)
                {

                    string culture = aliasInfo.AliasCulture;
                    string translation = aliasInfo.AliasURLPath.Split('/').LastOrDefault(al=>!string.IsNullOrWhiteSpace(al));
                    if (string.IsNullOrWhiteSpace(translation) || string.IsNullOrWhiteSpace(culture)) continue;
                    if (!dictSet.ContainsKey(culture))
                    {
                        dictSet.Add(culture, new RouteDictionary(culture));
                    }
                    RouteDictionary dict = dictSet[culture];
                    if (dict.TranslationDictionary.ContainsKey(defaultValue))
                    {
                        dict.TranslationDictionary[defaultValue] = translation;
                    }
                    else
                    {
                        dict.TranslationDictionary.Add(defaultValue, translation);
                    }
                }
            }
            return dictSet;
        }
        
        
        

        internal static TranslationItem SearchFreshTranslation(Dictionary<string, RouteDictionary> dictionarySet, CultureInfo cultureValue, string foreignCultureValue)
        {
            //get node having forignCultureValue
            var nodes = ContentHelper.GetAllNodes().Where(n => n.Aliases.Select(al => ((DocumentAliasInfo)al).AliasURLPath.Split('/').LastOrDefault().Equals(foreignCultureValue, StringComparison.InvariantCultureIgnoreCase)).Any());
            string defaultCultureValue = "";
            CultureInfo newPairCulture = null;
            string newPairValue = "";
            foreach (var node in nodes)
            {
                var defCulture = new CultureInfo("en-US");
                if (!dictionarySet.ContainsKey(defCulture.Name))
                {
                    dictionarySet.Add(defCulture.Name, new RouteDictionary(defCulture.Name));
                }
                RouteDictionary defDict = dictionarySet[defCulture.Name];
                if (defDict.TranslationDictionary.ContainsKey(node.NodeAlias))
                {
                    defDict.TranslationDictionary[node.NodeAlias] = node.NodeAlias;
                }
                else
                {
                    defDict.TranslationDictionary.Add(node.NodeAlias, node.NodeAlias);
                }
                // load translations from aliases
                foreach (DocumentAliasInfo aliasInfo in node.Aliases)
                {

                    string culture = aliasInfo.AliasCulture;
                    string translation = aliasInfo.AliasURLPath.Split('/').LastOrDefault(al => !string.IsNullOrWhiteSpace(al));
                    if (culture == cultureValue.Name)
                        defaultCultureValue = translation;
                    if (foreignCultureValue.Equals(translation, StringComparison.InvariantCultureIgnoreCase))
                    {
                        newPairCulture = new CultureInfo(culture);
                        newPairValue = translation;
                    }
                    if (string.IsNullOrWhiteSpace(translation) || string.IsNullOrWhiteSpace(culture)) continue;
                    if (!dictionarySet.ContainsKey(culture))
                    {
                        dictionarySet.Add(culture, new RouteDictionary(culture));
                    }
                    RouteDictionary dict = dictionarySet[culture];
                    if (dict.TranslationDictionary.ContainsKey(node.NodeAlias))
                    {
                        dict.TranslationDictionary[node.NodeAlias] = translation;
                    }
                    else
                    {
                        dict.TranslationDictionary.Add(node.NodeAlias, translation);
                    }
                }
            }
            if (!string.IsNullOrWhiteSpace(defaultCultureValue))
                return new TranslationItem(cultureValue, defaultCultureValue, foreignCultureValue);
            if (!string.IsNullOrWhiteSpace(newPairValue))
                return new TranslationItem(newPairCulture, newPairValue, foreignCultureValue);
            return null;
        }
    }
}