using System;
using System.Collections.Generic;
using System.Linq;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.Providers
{
    public class ProductProvider: IProductProvider
    {
		public List<Product> GetProductItems(List<Guid> guids, string siteName)
        {
            return ContentHelper.GetDocsByGuids<Product>(guids, siteName);
		}

        public Product GetProduct(string alias)
        {
            return ContentHelper.GetDocByName<Product>(Product.CLASS_NAME, alias);
        }

        public List<BreadCrumbLinkItemViewModel> GetBreadcrumb(string name)
        {
            return ContentHelper.GetBreadcrumb<Product>(Product.CLASS_NAME, name);
        }


        public List<string> GetAvailableRegions(Product product)
        {
            return product.Regions.Split('|').ToList();
        }

        //ToDo: 
        public List<DownloadLanguageLinkItemViewModel> GetAvailableTranslations(Product product)
        {
            return new List<DownloadLanguageLinkItemViewModel>
            {
                new DownloadLanguageLinkItemViewModel { LanguageId = "langEnglish", Reference = "#", Title = "English" },
                new DownloadLanguageLinkItemViewModel { LanguageId = "langGerman", Reference = "#", Title = "German" }
            };
        }

        //ToDo
        public string GetDownloadLink(Product product)
        {
            return "#";
        }
    }
}

