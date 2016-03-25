using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;

namespace CMS.Mvc.ViewModels.ATCTools
{
    public class ATCToolsPageViewModel
    {
        public string Title { get; set; }
        public string GATCTitle { get; set; }
        public string GATCContent { get; set; }
        public string GATCPrompt { get; set; }
        public string NATCTitle { get; set; }
        public string NATCContent { get; set; }
        public string NATCPrompt { get; set; }
        public string BottomContent { get; set; }

        public string ParentTitle { get; set; }

        public SidebarViewModel SideBar { get; set; }
        public BreadCrumbViewModel BreadCrumb { get; set; }
    }
}