using System.Collections.Generic;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.ViewModels.Product;
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


        public List<LinkItemViewModel> GetAvailableRegions(Product product)
        {
            return new List<LinkItemViewModel> { new LinkItemViewModel { Reference = "#", Title = "Asia Pacific" } };
        }


        public List<DownloadLanguageLinkItemViewModel> GetAvailableTranslations(Product product)
        {
            return new List<DownloadLanguageLinkItemViewModel>
            {
                new DownloadLanguageLinkItemViewModel { LanguageId = "langEnglish", Reference = "#", Title = "English" },
                new DownloadLanguageLinkItemViewModel { LanguageId = "langGerman", Reference = "#", Title = "German" }
            };
        }


        public string GetDownloadLink(Product product)
        {
            return "#";
        }
    }
}
