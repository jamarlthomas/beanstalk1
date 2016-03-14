using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Helpers
{
    public static class RouteHelper
    {
        public static string GetUrl(TreeNode node)
        {
            var nodeType = node.GetType();
            if (nodeType == typeof(Document) || nodeType == typeof(CustomNews))
            {
                return string.Format("/Document/Index/{0}", node.NodeAlias);
            }
            if (nodeType == typeof(Solution))
            {
                return string.Format("/Solution/Index/{0}/{1}", node.NodeAlias, node.Parent.NodeAlias);
            }
            return node.NodeAliasPath;
        }
    }
}