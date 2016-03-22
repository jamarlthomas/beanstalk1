using System;
using System.Collections.Generic;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;


namespace CMS.Mvc.Interfaces
{
    public interface ISidebarProvider
    {
        List<TreeNode> GetSideBarItems(IEnumerable<Guid> ids);
    }
}
