using System.Collections.Generic;
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
    public class ProductController: SidebarPageController
    {
        private readonly IProductProvider _productProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;
        public ProductController()
        {
            _productProvider = new ProductProvider();
            _treeNodesProvider = new TreeNodesProvider();
        }

        [PageVisitActivity]
        public ActionResult Index(string name)
        {
            var product = _productProvider.GetProduct(name);
            ProductPageViewModel productModel = new ProductPageViewModel();
            productModel.SideBar.Items = MapSidebar(_sidebarProvider.GetSideBarItems(UtilsHelper.ParseGuids(product.SidebarItems)), product);
            productModel.BreadCrumb.BreadcrumbLinkItems = _treeNodesProvider.GetBreadcrumb(product.DocumentGUID);
            productModel.DownloadWidget = GetDownloadwidget(product);

            productModel.ContentCopyArea = MapData<Product, ViewModels.Product.ProductViewModel>(product);
            productModel.RelatedProducts = GetRelatedProductsWidget(product);

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
            return new DownloadWidgetViewModel()
            {
                Title = product.Title,
                TileImage = product.HomeImage,
                Description = product.Description,
                DownloadLink = _productProvider.GetDownloadLink(product),
                AvailableIn = _productProvider.GetAvailableRegions(product).Select(item => new LinkViewModel() {Title = item}).ToList(),
                TranslationAvailable = _productProvider.GetAvailableTranslations(product),
                
            };
        }
    }
}