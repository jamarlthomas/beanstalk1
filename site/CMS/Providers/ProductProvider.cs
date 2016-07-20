using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using CMS.DocumentEngine.Types;
using CMS.DocumentEngine;
using CMS.Helpers;
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
        public List<Product> GetProductsBySBU(string SBUName,string parentPath)
        {
            var productList = new List<Product>();
            var solutionList = ContentHelper.GetDocChildrenByNameWithParent<Solution>(Solution.CLASS_NAME, SBUName, parentPath);
            foreach (var solution in solutionList)
            {
                productList.AddRange(ContentHelper.GetDocChildrenByNameWithParent<Product>(Product.CLASS_NAME, solution.NodeAlias, solution.NodeAliasPath));
            }
            return productList;
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


        public List<Region> GetAvailableRegions(Product product)
        {
            var regionStr = product.Regions.Split('|').Where(r=>!string.IsNullOrWhiteSpace(r)).ToList();
            var regions = new List<Region>();
            var _regionProvider = new RegionProvider();
            foreach ( var region in regionStr )
            {
                regions.Add( _regionProvider.GetRegionByTitle( region ) );
            }
            return regions;

        }

        //ToDo: 
        public List<DownloadLanguageLinkItemViewModel> GetAvailableTranslations(Product product)
        {
            return product
                .CultureVersions
                .Where(p=>!string.IsNullOrWhiteSpace(((Product)p).PdfReference))
                .Select(item => new DownloadLanguageLinkItemViewModel()
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

