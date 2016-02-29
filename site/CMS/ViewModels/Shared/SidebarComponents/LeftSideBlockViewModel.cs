using System.Web;
using CMS.DocumentEngine;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class LeftSideBlockViewModel : SidebarItemViewModel
    {
        public LeftSideBlockViewModel(TreeNode item) : base(item)
        {
            Reference = item.GetStringValue("Reference", "");
            ImageUrl = item.GetStringValue("ImageUrl", "");
            Summary = new HtmlString(item.GetStringValue("Summary", ""));
        }
        public string Reference { get; set; }
        public string ImageUrl { get; set; }
        public HtmlString Summary { get; set; }
    }
}
