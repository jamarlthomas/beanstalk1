using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class LeftNavigationItemViewModel
    {
        public string Title { get; set; }
        public string Link { get; set; }
        public IEnumerable<LeftNavigationItemViewModel> SubMenu { get; set; }
    }
}