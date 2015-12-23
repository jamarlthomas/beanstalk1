using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.ViewModels.Master
{
    public class PagesMenuItemViewModel : LinkItemViewModel
    {
		public List<FooterNavItemViewModel> FooterNavItems { get; set; }
    }
}