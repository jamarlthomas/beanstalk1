using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class InsightsAndResourcesBlockViewModel : SidebarComponentWithDefaultImageViewModel
    {
        public InsightsAndResourcesBlockViewModel(TreeNode item) : base(item)
        {
        }
        
        protected override void Load()
        {
            base.Load();
            Title = ((Document)item).Title;
            Summary = ((Document)item).Abstract;
        }
    }
}
