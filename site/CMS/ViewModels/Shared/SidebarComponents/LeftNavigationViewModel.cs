using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class LeftNavigationViewModel : SidebarItemViewModel
    {
        public IEnumerable<LeftNavigationItemViewModel> NavItems { get; set; }
        public bool HasHero { get; set; }
    }
}