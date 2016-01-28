using System;
using System.Collections.Generic;
using CMS.DocumentEngine;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Models.Afton.Shared;

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
            return new List<Country>
            {
                new Country {CountryName = "Afghanistan"},
                new Country {CountryName = "Albania"},
                new Country {CountryName = "Algeria"},
                new Country {CountryName = "American Samoa"},
                new Country {CountryName = "Andorra"}
            };
        }
    }
}