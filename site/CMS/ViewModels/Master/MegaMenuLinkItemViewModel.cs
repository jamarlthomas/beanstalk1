using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;

namespace CMS.Mvc.ViewModels.Master
{
    public class MegaMenuLinkItemViewModel : LinkViewModel
    {
        public List<MegaMenuSolutionBusinessUnitViewModel> Solutions { get; set; }
    }
}