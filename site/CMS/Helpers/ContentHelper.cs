using CMS.DocumentEngine;
using CMS.PortalEngine;
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
    }
}