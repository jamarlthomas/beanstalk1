using System.Collections.Generic;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Shared;
using System;

namespace CMS.Mvc.Interfaces
{
    public interface IProductProvider
    {
        Product GetProduct(string alias);
        List<BreadCrumbLinkItemViewModel> GetBreadcrumb(string name);

        List<LinkViewModel> GetAvailableRegions(Product product);

        List<DownloadLanguageLinkItemViewModel> GetAvailableTranslations(Product product);

        string GetDownloadLink(Product product);
        List<Product> GetProductItems(List<Guid> guids, string sitename);
    }
}
