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
                var treeNodes = DocumentHelper.GetDocuments(className).Published()
                    .OrderBy("NodeLevel", "NodeOrder", "NodeName");
                return treeNodes.Select(item => (T)item).Where(i => i != null).ToList();
            }
            else
            {
                var tree = new TreeProvider();
                var baseNodes = tree.SelectNodes(className);
                var treeNodes = baseNodes.Published()
                    .OrderBy("NodeLevel", "NodeOrder", "NodeName");
                return treeNodes.Select(item => (T)item).Where(i => i != null).ToList();
            }
        }
      
        public static List<T> GetDocChildrenByName<T>(string childrenClassName, string docName) where T : TreeNode, new()
        {
            docName = docName.Replace(' ', '-');
            if (PortalContext.ViewMode == ViewModeEnum.Preview)
            {
                var docs = DocumentHelper.GetDocuments(childrenClassName).Published()
                    .OrderBy("NodeLevel", "NodeOrder", "NodeName")
                    .Where(item => item.Parent.NodeAlias.Equals(docName, StringComparison.CurrentCultureIgnoreCase));
                return docs.Select(item => (T)item).ToList();
            }
            else
            {
                var tree = new TreeProvider();
                var docs = tree.SelectNodes(childrenClassName).Published()
                    .OrderBy("NodeLevel", "NodeOrder", "NodeName")
                    .Where(item => item.Parent.NodeAlias.Equals(docName, StringComparison.CurrentCultureIgnoreCase));
                return docs.Select(item => (T)item).ToList();
            }
        }

        public static List<TreeNode> GetAllNodes()
        {
            if (PortalContext.ViewMode == ViewModeEnum.Preview)
            {
                var docs = DocumentHelper.GetDocuments().AllCultures();
                return docs.ToList();
            }
            else
            {
                var tree = new TreeProvider();
                var docs = tree.SelectNodes().Published()
                    .OrderBy("NodeLevel", "NodeOrder", "NodeName");
                return docs.ToList();

            }
        }

        public static T GetDocByName<T>(string className, string docName) where T : TreeNode, new()
        {
            docName = docName.Replace(' ', '-');
            if (PortalContext.ViewMode == ViewModeEnum.Preview)
            {
                var doc = DocumentHelper.GetDocuments(className).Published()
                    .OrderBy("NodeLevel", "NodeOrder", "NodeName")
                    .FirstOrDefault(item => item.NodeAlias.Equals(docName, StringComparison.CurrentCultureIgnoreCase));
                return (T)doc;
            }
            else
            {
                TreeProvider tree = new TreeProvider();
                var doc = tree.SelectNodes(className).Published()
                    .OrderBy("NodeLevel", "NodeOrder", "NodeName")
                    .FirstOrDefault(item => item.NodeAlias.Equals(docName, StringComparison.CurrentCultureIgnoreCase));
                return (T)doc;
            }
        }
    }
}