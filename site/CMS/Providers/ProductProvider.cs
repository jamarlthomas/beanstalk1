﻿using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Shared;
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
            CurrentProduct = ContentHelper.GetDocByName<Product>(Product.CLASS_NAME, alias);
            return CurrentProduct;
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
            return product.CultureVersions.Select(
                item => new DownloadLanguageLinkItemViewModel()
                {
                    LanguageId = item.DocumentCulture,
                    Reference = ((Product)item).PdfReference,
                    Title =
                        (((new CultureInfo(item.DocumentCulture)).NativeName).IndexOf("(", StringComparison.Ordinal) > 0)
                            ? (new CultureInfo(item.DocumentCulture)).NativeName.Substring(0, ((new CultureInfo(item.DocumentCulture)).NativeName).IndexOf("(", StringComparison.Ordinal)).TrimEnd()
                            : (new CultureInfo(item.DocumentCulture)).NativeName.TrimEnd()
                }).ToList();

        }

        //ToDo
        public string GetDownloadLink(Product product)
        {
            return product.PdfReference;
        }


        public List<Product> GetSiblings(Product product)
        {

            return ContentHelper.GetSiblings<Product>(product);
        }
    }
}

