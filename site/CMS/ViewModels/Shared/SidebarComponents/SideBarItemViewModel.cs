using CMS.DocumentEngine;
using CMS.Mvc.ViewModels.Product;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public abstract class SidebarItemViewModel: BaseLoadViewModel
    {
        public string Title;
        public string ClassName { get; set; }

        protected SidebarItemViewModel(TreeNode item) : base(item)
        {
            Title = item.GetStringValue("Title", "");
            ClassName = item.ClassName;
        }

        protected override void Load()
        {
            
        }
    }
}
