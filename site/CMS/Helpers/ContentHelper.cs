using CMS.DocumentEngine;
using CMS.PortalEngine;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CMS.Mvc.Helpers
{
    public class ContentHelper
    {
        public static List<T> GetDocs<T>(string className) where T : TreeNode, new()
        {
            if (PortalContext.ViewMode == ViewModeEnum.Preview)
            {
                var treeNodes = DocumentHelper.GetDocuments(className).OnCurrentSite().Published()
                    .OrderBy("NodeLevel", "NodeOrder", "NodeName");
                return treeNodes.Select(item => (T)item).Where(i => i != null).ToList();
            }
            else
            {
                var tree = new TreeProvider();
                var treeNodes = tree.SelectNodes(className).OnCurrentSite().Published()
                    .OrderBy("NodeLevel", "NodeOrder", "NodeName");
                return treeNodes.Select(item => (T)item).Where(i => i != null).ToList();
            }
        }

        public static List<T> GetDocChildrenByName<T>(string childrenClassName, string docName) where T : TreeNode, new()
        {
            docName = docName.Replace(' ', '-');
            if (PortalContext.ViewMode == ViewModeEnum.Preview)
            {
                var docs = DocumentHelper.GetDocuments(childrenClassName).OnCurrentSite().Published()
                    .OrderBy("NodeLevel", "NodeOrder", "NodeName")
                    .Where(item => item.Parent.NodeAlias.Equals(docName, StringComparison.CurrentCultureIgnoreCase));
                return docs.Select(item => (T)item).ToList();
            }
            else
            {
                var tree = new TreeProvider();
                var docs = tree.SelectNodes(childrenClassName).OnCurrentSite().Published()
                    .OrderBy("NodeLevel", "NodeOrder", "NodeName")
                    .Where(item => item.Parent.NodeAlias.Equals(docName, StringComparison.CurrentCultureIgnoreCase));
                return docs.Select(item => (T)item).ToList();
            }
        }
    }
}