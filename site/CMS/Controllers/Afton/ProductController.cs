using System;
using System.Linq;
using System.Web.Mvc;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.Controllers.Afton
{
    public class ProductController : SidebarPageController
    {
        private readonly IProductProvider _productProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;
        public ProductController()
        {
            _productProvider = new ProductProvider();
            _treeNodesProvider = new TreeNodesProvider();
        }

        //[Route("Product/{alias}")]

        [PageVisitActivity]
        public ActionResult Index(string ProductName)
        {
            var product = _productProvider.GetProduct(ProductName);
            ProductPageViewModel productModel = MapData<Product, ProductPageViewModel>(product);
            var sidebarItems = ContentHelper.GetDocByDocId<Product>(product.DocumentID).Fields.SidebarItems2.ToList();
            //if (sidebarItems.Count() == 0)
            //{
            //    sidebarItems = _sidebarProvider.GetSideBarItems(UtilsHelper.ParseGuids(product.SidebarItems));
            //}
            productModel.SideBar.Items = MapSidebar(sidebarItems, product);
            productModel.BreadCrumb.BreadcrumbLinkItems = _treeNodesProvider.GetBreadcrumb(product.DocumentGUID);
            productModel.DownloadWidget = GetDownloadwidget(product);

            productModel.ContentCopyArea = MapData<Product, CMS.Mvc.ViewModels.Product.ProductViewModel>(product);
            productModel.ContentCopyArea.DefaultContent = UtilsHelper.ToHtmlString(productModel.ContentCopyArea.DefaultContent.ToString().Replace("~/", "/"));
            //productModel.RelatedProducts = GetRelatedProductsWidget(product);

            return View("~/Views/Afton/Product/Index.cshtml", productModel);
        }



        private RelatedProductsViewModel GetRelatedProductsWidget(Product product)
        {
            var widget = new RelatedProductsViewModel();
            var products = _productProvider.GetSiblings(product);
            widget.Products = MapData<Product, RelatedProductCardViewModel>(products);
            return widget;
        }




        private DownloadWidgetViewModel GetDownloadwidget(Product product)
        {
            var translations = _productProvider.GetAvailableTranslations(product);
            var selectedTranslation = translations.FirstOrDefault(t => t.LanguageId.Equals(GetCurrentCulture())) ??
                      translations.FirstOrDefault();
            return new DownloadWidgetViewModel()
            {
                SelectedTranslation = selectedTranslation,
                Title = product.Title,
                TileImage = product.HomeImage,
                Description = product.Description,
                DownloadLink = _productProvider.GetDownloadLink(product),
                AvailableIn = _productProvider.GetAvailableRegions(product).Select(item => new LinkViewModel() { Title = item }).ToList(),
                TranslationAvailable = translations
            };
        }
    }
}
