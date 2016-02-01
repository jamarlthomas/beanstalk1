using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.ViewModels.Product
{
    public class ProductPageViewModel
    {
        public ProductPageViewModel()
        {
            ContactUs = new ContactUsViewModel();
            BreadCrumb = new BreadCrumbViewModel();
            ContentCopyArea = new ProductViewModel();
            StayInformed = new StayInformedViewModel();
            InsightsAndResourcesWidget = new InsightsAndResourcesWidgetViewModel();
            PassionWidget = new PassionWidgetViewModel();
            RelatedProducts = new RelatedProductsViewModel();
            InsightsAndResourcesSection = new InsightsAndResourcesSectionViewModel();
            BreadCrumb = new BreadCrumbViewModel();
            DownloadWidget = new DownloadWidgetViewModel();
        }

        public ContactUsViewModel ContactUs { get; set; }
        public ProductViewModel ContentCopyArea { get; set; }
        public StayInformedViewModel StayInformed { get; set; }
        public InsightsAndResourcesWidgetViewModel InsightsAndResourcesWidget { get; set; }
        public PassionWidgetViewModel PassionWidget { get; set; }
        public RelatedProductsViewModel RelatedProducts { get; set; }
        public InsightsAndResourcesSectionViewModel InsightsAndResourcesSection { get; set; }
        public BreadCrumbViewModel BreadCrumb { get; set; }
        public DownloadWidgetViewModel DownloadWidget { get; set; }

        public ProductViewModel ContentCopy { get; set; }
    }
}
