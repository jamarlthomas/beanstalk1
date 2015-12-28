﻿using System.Collections.Generic;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.Providers
{
    public class ProductProvider : IProductProvider
    {
        public Product GetProduct(string alias)
        {
            return ContentHelper.GetDocByName<Product>(Product.CLASS_NAME, alias);
        }

        public List<BreadCrumbLinkItemViewModel> GetBreadcrumb(string name)
        {
            return ContentHelper.GetBreadcrumb<Product>(Product.CLASS_NAME, name);
        }
    }
}
