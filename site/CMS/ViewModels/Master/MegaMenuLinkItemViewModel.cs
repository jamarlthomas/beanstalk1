using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.ViewModels.Master
{
    public class MegaMenuLinkItemViewModel : LinkItemViewModel
    {
        public List<MegaMenuSolutionBusinessUnitViewModel> Solutions { get; set; }
    }
}