using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;

namespace CMS.Mvc.ViewModels.Product
{
    public class RelatedProductCardViewModel : LinkItemViewModel
    {
        public string ImageUrl { get; set; }
        public string Header { get; set; }
        public string Text { get; set; }
        public string SubHeader { get; set; }
    }
}
