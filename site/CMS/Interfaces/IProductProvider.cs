using System;
using System.Collections.Generic;
﻿using CMS.DocumentEngine.Types;
﻿using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.Interfaces
{
    public interface IProductProvider 
    {
        Product GetProduct(string alias);
        List<Product> GetProductsBySBU(string SBUName, string parentPath);
        List<BreadCrumbLinkItemViewModel> GetBreadcrumb(string name);
        List<Region> GetAvailableRegions(Product product);
        List<DownloadLanguageLinkItemViewModel> GetAvailableTranslations(Product product);
        string GetDownloadLink(Product product);
       
        List<Product> GetProductItems(List<Guid> featuredProductListGuids, string siteName);

        List<Product> GetSiblings(Product product);
    }
}
