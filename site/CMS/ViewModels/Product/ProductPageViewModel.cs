using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.Personalization;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;

namespace CMS.Mvc.ViewModels.Product
{
    public class ProductPageViewModel : PersonalizationCardViewModel
    {
        public ProductPageViewModel()
        {
            BreadCrumb = new BreadCrumbViewModel();
            ContentCopyArea = new ProductViewModel();
            RelatedProducts = new RelatedProductsViewModel();
            BreadCrumb = new BreadCrumbViewModel();
            DownloadWidget = new DownloadWidgetViewModel();
            SideBar = new SidebarViewModel();
        }
        public SidebarViewModel SideBar { get; set; }
        public ProductViewModel ContentCopyArea { get; set; }
        public RelatedProductsViewModel RelatedProducts { get; set; }
        public BreadCrumbViewModel BreadCrumb { get; set; }
        public DownloadWidgetViewModel DownloadWidget { get; set; }

        public ProductViewModel ContentCopy { get; set; }
    }
}
