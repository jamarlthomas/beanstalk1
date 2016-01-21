using CMS.DocumentEngine;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class LeftSideBlockViewModel : SidebarItemViewModel
    {
        public LeftSideBlockViewModel(TreeNode item) : base(item)
        {
            Reference = item.GetStringValue("Reference", "");
            ImageUrl = item.GetStringValue("ImageUrl", "");
            Summary = item.GetStringValue("Summary", "");
        }
        public string Reference { get; set; }
        public string ImageUrl { get; set; }
        public string Summary { get; set; }
    }
}
