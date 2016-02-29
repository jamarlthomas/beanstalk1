using System.Collections.Generic;
using System.Linq;
using CMS.DocumentEngine;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class LeftNavigationProvider : ILeftNavigationProvider
    {
        private const string TITLE_SOURCE_COLUMN_NAME = "Title";
        public List<TreeNode> GetNavItems(string aliasPath)
        {
            var navItems = ContentHelper.GetDocsByPath(aliasPath, 2);
            var topLayerNav = navItems.Where(w => w.Parent.NodeAliasPath == aliasPath).ToList();
            foreach (var secondLayerNavItem in topLayerNav.SelectMany(topLayerNavItem => topLayerNavItem.Children))
            {
                secondLayerNavItem.SetValue(TITLE_SOURCE_COLUMN_NAME, navItems.First(f => f.DocumentID == secondLayerNavItem.DocumentID).GetStringValue(TITLE_SOURCE_COLUMN_NAME, secondLayerNavItem.NodeAlias));
            }
            return topLayerNav;
        }
    }
}