using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class FooterNavItemProvider : IFooterNavItemProvider
    {
        public List<FooterNavItem> GetFooterNavItems(string parentAlias)
        {
            return ContentHelper.GetDocChildrenByName<FooterNavItem>(FooterNavItem.CLASS_NAME, parentAlias);
        }
    }
}