using System.Collections.Generic;
using System.Linq;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Shared;
using System;

namespace CMS.Mvc.Providers
{
    public class ProductProvider : IProductProvider
    {

        public Product CurrentProduct { get; set; }

        public List<Product> GetProductItems(List<Guid> guids, string siteName)
        {
            return ContentHelper.GetDocsByGuids<Product>(guids, siteName);
		}

        public Product GetProduct(string alias)
        {
            CurrentProduct =  ContentHelper.GetDocByName<Product>(Product.CLASS_NAME, alias);
            return CurrentProduct;
			}
        public List<BreadCrumbLinkItemViewModel> GetBreadcrumb(string name)
        {
            return ContentHelper.GetBreadcrumb<Product>(Product.CLASS_NAME, name);
        }


        public List<LinkViewModel> GetAvailableRegions(Product product)
        {
            return new List<LinkViewModel> { new LinkViewModel { Reference = "#", Title = "Asia Pacific" } };
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


        public List<Product> GetSiblings(Product product)
        {

            return ContentHelper.GetSiblings<Product>(product);
        }
    }
}
