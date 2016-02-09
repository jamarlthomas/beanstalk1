using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class GenericSidebarBlockViewModel : SidebarComponentWithDefaultImageViewModel
    {
        public GenericSidebarBlockViewModel(TreeNode item) : base(item)
        {
            DefaultImage = ((GenericSidebarBlock)item).DefaultImage;
        }

        protected override void Load()
        {
            base.Load();
        }
    }
}
