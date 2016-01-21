using CMS.DocumentEngine;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class SidebarContainerWithDefaultImage : SidebarItemViewModel
    {
        public SidebarContainerWithDefaultImage(TreeNode item) : base(item)
        {
        }
        public string DefaultImage { get; set; }
    }
}
