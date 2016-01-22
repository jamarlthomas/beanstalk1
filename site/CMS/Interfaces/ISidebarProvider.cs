using System.Collections.Generic;
using CMS.DocumentEngine;
using CMS.Mvc.Models.Afton.Shared;

namespace CMS.Mvc.Interfaces
{
    public interface ISidebarProvider
    {
        List<TreeNode> GetSideBarItems(string[] p);

        List<Country> GetCountries();
    }
}
