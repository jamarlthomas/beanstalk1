using System;
using System.Collections.Generic;
using CMS.DocumentEngine;
using CMS.Mvc.Models.Afton.Shared;

namespace CMS.Mvc.Interfaces
{
    public interface ISidebarProvider
    {
        List<TreeNode> GetSideBarItems(IEnumerable<Guid> ids);

        List<Country> GetCountries();
    }
}
