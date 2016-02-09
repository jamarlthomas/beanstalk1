using System;
using System.Collections.Generic;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class SidebarProvider : ISidebarProvider
    {
        public List<TreeNode> GetSideBarItems(IEnumerable<Guid> ids)
        {
            var nodes = ContentHelper.GetDocsByGuids<TreeNode>(ids);
            return nodes;
        }

        public List<Country> GetCountries()
        {
            return ContentHelper.GetDocs<Country>(Country.CLASS_NAME);
        }
    }
}