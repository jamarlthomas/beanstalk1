using System;
using CMS.DocumentEngine.Types;
using TreeNode = CMS.DocumentEngine.TreeNode;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class PollSurveyViewModel : SidebarItemViewModel
    {
        public string Question { get; set; }
        public DateTime Expire { get; set; }
    }
}
