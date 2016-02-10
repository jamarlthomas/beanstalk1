using System.Collections.Generic;
using CMS.DocumentEngine;

namespace CMS.Mvc.Interfaces
{
    public interface ILeftNavigationProvider
    {
        List<TreeNode> GetNavItems(string aliasPath);
    }
}