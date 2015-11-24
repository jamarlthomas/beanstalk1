using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IFooterNavItemProvider
    {
        List<FooterNavItem> GetFooterNavItems(string parentAlias);
    }
}
