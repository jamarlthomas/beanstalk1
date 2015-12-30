﻿using System.Collections.Generic;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.Interfaces
{
    public interface IProductProvider
    {
        Product GetProduct(string alias);
        List<BreadCrumbLinkItemViewModel> GetBreadcrumb(string name);

        List<LinkItemViewModel> GetAvailableRegions(Product product);

        List<DownloadLanguageLinkItemViewModel> GetAvailableTranslations(Product product);

        string GetDownloadLink(Product product);
    }
}
