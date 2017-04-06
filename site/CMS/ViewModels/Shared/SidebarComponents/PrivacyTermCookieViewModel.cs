using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class GenericSidebarBlockViewModel : SidebarComponentWithDefaultImageViewModel
    {
        public GenericSidebarBlockViewModel(TreeNode item) : base(item)
        {
            DefaultImage = ((GenericSidebarBlock) item).DefaultImage;

            if (!string.IsNullOrEmpty(((GenericSidebarBlock)item).Description))
            {
                Description = UtilsHelper.ToHtmlString(((GenericSidebarBlock)item).Description);
            }

            if (!string.IsNullOrEmpty(((GenericSidebarBlock)item).ManualReference))
            {
                Reference = ((GenericSidebarBlock)item).ManualReference;
            }
            
        }
    }
}
