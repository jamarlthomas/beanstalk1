using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.ViewModels.Master
{
    public class ContentMenuItemViewModel : LinkViewModel
    {

        public List<MegaMenuThumbnailedItemViewModel> ThumbnailedMenuItems { get; set; }
        public MegaMenuLinkItemViewModel SolutionsLink { get; set; }

        public bool Selected { get; set; }
    }
}