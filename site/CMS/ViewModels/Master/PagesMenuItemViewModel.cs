using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;

namespace CMS.Mvc.ViewModels.Master
{
    public class PagesMenuItemViewModel : LinkViewModel
    {
		public List<FooterNavItemViewModel> FooterNavItems { get; set; }
    }
}