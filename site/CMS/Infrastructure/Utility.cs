using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Routing;
using CMS.Mvc.Helpers;
using Infrastructure.Localization;
using CMS.DocumentEngine;

namespace CMS.Mvc.Infrastructure
{
    public class Utility
    {
        internal static void LoadTranslations(RouteValueTranslationProvider translProvider)
        {

            //translProvider.LoadPresets(CultureList);
            var nodes = ContentHelper.GetAllNodes();
            translProvider.RouteDictionarySet =  Utility.GetTranslations(nodes);

        }

        private static Dictionary<string, RouteDictionary> GetTranslations(List<TreeNode> nodes)
        {
            if (!nodes.Any()) return null;
            var dictSet = new Dictionary<string, RouteValueDictionary>();
            foreach (var cultureName in CultureList)
            {
                //create dictionary
                dictSet.Add(cultureName, new RouteValueDictionary(cultureName));
            }
            foreach (TreeNode node in nodes)
            {
                //get default(english?) value
                var firstOrDefault = node.CultureVersions.WithAllData.FirstOrDefault(
                    item => item.DocumentCulture.Equals("en-US", StringComparison.InvariantCultureIgnoreCase));
                if (firstOrDefault == null) continue;
                var defaultValue =
                    firstOrDefault.NodeAlias;
                foreach (TreeNode culturedNode  in node.CultureVersions.WithAllData)
                {
                    if (!dictSet.ContainsKey(culturedNode.DocumentCulture))
                    {
                        dictSet.Add(culturedNode.DocumentCulture, new RouteValueDictionary(culturedNode.DocumentCulture));
                    }
                    RouteValueDictionary dict = dictSet[culturedNode.DocumentCulture];
                    if (dict.ContainsKey(defaultValue))
                    {
                        dict[defaultValue] = culturedNode.NodeAlias;
                    }
                    else
                    {
                        dict.Add(defaultValue, culturedNode.NodeAlias);
                    }
                }
            }


            return new Dictionary<string, RouteDictionary>();
        }
        public static List<string> CultureList
        {
            get
            {
                var list = new List<string>();
                list.Add("en-US");
                list.Add("zh-CN");
                list.Add("de-DE");
                list.Add("ja-JP");
                list.Add("ru-RU");
                list.Add("es-ES");
                list.Add("pt-PT");
                return list;
            }
        }
    }
}