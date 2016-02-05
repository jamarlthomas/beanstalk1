using CMS.DocumentEngine.Types;
using TreeNode = CMS.DocumentEngine.TreeNode;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class StayInformedViewModel : SidebarItemViewModel
    {
        public StayInformedViewModel(TreeNode item): base(item)
        {}

        public string Copy { get; set; }

        protected override void Load()
        {
            base.Load();
            Copy = ((StayInformed)item).Copy;
        }
    }
}
