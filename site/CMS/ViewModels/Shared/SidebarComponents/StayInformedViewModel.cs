using CMS.DocumentEngine.Types;
using TreeNode = CMS.DocumentEngine.TreeNode;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class StayInformedViewModel : SidebarItemViewModel
    {
        public StayInformedViewModel(TreeNode item): base(item)
        {}

        public string Copy { get; set; }
        public string EmailPlaceholder { get; set; }
        public string SubmitButtonText { get; set; }

        protected override void Load()
        {
            base.Load();
            var stayInformedItem = (StayInformed)item;
            Copy = stayInformedItem.Copy;
            EmailPlaceholder = stayInformedItem.EmailPlaceholder;
            SubmitButtonText = stayInformedItem.SubmitButtonText;
        }
    }
}
