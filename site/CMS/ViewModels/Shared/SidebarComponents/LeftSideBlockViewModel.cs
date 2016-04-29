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
            Description = new HtmlString(item.GetStringValue("Description", ""));
        }
        public string Reference { get; set; }
        public string ImageUrl { get; set; }
        public HtmlString Description { get; set; }
    }
}
