using System.Collections.Generic;
using System.Web.Mvc;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.Controllers.Afton
{
    public class ProductController : BaseController
    {
        private readonly IProductProvider _productProvider;
        private readonly ILookupProvider _lookupProvider;

        public ProductController()
        {
            _productProvider = new ProductProvider();
            _lookupProvider = new LookupProvider();
        }

        //[Route("Product/{alias}")]
        public ActionResult Index(string name)
        {
            var product = _productProvider.GetProduct(name);
            ProductPageViewModel productModel = new ProductPageViewModel();
            productModel.ContactUs.Regions = MapData<Region, RegionViewModel>(_lookupProvider.GetRegions());
            productModel.StayInformed = new StayInformedViewModel();
            productModel.InsightsAndResourcesWidget.InsightsAndResourcesBlocks = new List<InsightsAndResourcesBlockViewModel>();
            productModel.PassionWidget = new PassionWidgetViewModel();
            productModel.BreadCrumb.BreadcrumbLinkItems = _productProvider.GetBreadcrumb(name);  
            productModel.DownloadWidget = MapData<Product, DownloadWidgetViewModel>(product);
            productModel.DownloadWidget.DownloadLink = _productProvider.GetDownloadLink(product);
            productModel.DownloadWidget.AvailableIn = _productProvider.GetAvailableRegions(product);
            productModel.DownloadWidget.TranslationAvailable = _productProvider.GetAvailableTranslations(product);

            productModel.ContentCopyArea = MapData<Product, ProductViewModel>(product);
            productModel.RelatedProducts.Products = new List<RelatedProductCardViewModel>();
            productModel.InsightsAndResourcesSection.InsightsAndResourcesCards = new List<InsightsAndResourcesCard>();
            return View("~/Views/Afton/Product/Index.cshtml", productModel);
        }
    }
}