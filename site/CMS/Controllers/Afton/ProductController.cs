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
        private readonly PersonalisationProvider<InsightsResources> _personalisationProvider;
        public ProductController()
        {
            _productProvider = new ProductProvider();
            _personalisationProvider = new PersonalisationProvider<InsightsResources>();
        }

        //[Route("Product/{alias}")]
        //[PageViewActionFilter]
        [PageVisitActivity]
        [DownloadActivity]
        public ActionResult Index(string name)
        {
            var product = _productProvider.GetProduct(name);
            ProductPageViewModel productModel = new ProductPageViewModel();
            productModel.SideBar.Items = MapSidebar(_sidebarProvider.GetSideBarItems(StringToGuidsConvertHelper.ParseGuids(product.SidebarItems)), product);
            productModel.BreadCrumb.BreadcrumbLinkItems = _productProvider.GetBreadcrumb(name);
            productModel.DownloadWidget = GetDownloadwidget(product);

            productModel.ContentCopyArea = MapData<Product, ViewModels.Product.ProductViewModel>(product);
            productModel.RelatedProducts = GetRelatedProductsWidget(product);
            productModel.InsightsAndResourcesSection.InsightsAndResourcesCards = GetInsightAndResourcesCards();// new List<InsightsAndResourcesCard>();

            return View("~/Views/Afton/Product/Index.cshtml", productModel);
        }

        private List<InsightsAndResourcesCard> GetInsightAndResourcesCards()
        {
            return MapData<InsightsResources, InsightsAndResourcesCard>(_personalisationProvider.GetPersonalizedItems());
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
                TileImage = product.TileImage,
                Description = product.Description,
                DownloadLink = _productProvider.GetDownloadLink(product),
                AvailableIn = _productProvider.GetAvailableRegions(product).Select(item => new LinkViewModel() {Title = item}).ToList(),
                TranslationAvailable = _productProvider.GetAvailableTranslations(product),
                
            };
        }
    }
}