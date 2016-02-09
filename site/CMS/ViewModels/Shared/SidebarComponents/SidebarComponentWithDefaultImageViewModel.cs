using CMS.DocumentEngine;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class SidebarComponentWithDefaultImageViewModel : LeftSideBlockViewModel
    {
        public SidebarComponentWithDefaultImageViewModel(TreeNode item)
            : base(item)
        {
            
        }
        public string DefaultImage { get; set; }

        
    }
}