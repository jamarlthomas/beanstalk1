using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;

namespace CMS.Mvc.ViewModels.Master
{
    public class ContentMenuItemViewModel : LinkViewModel
    {
        public List<MegaMenuThumbnailedItemViewModel> ThumbnailedMenuItems { get; set; }
        public MegaMenuLinkItemViewModel SolutionsLink { get; set; }
    }
}