using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.Master
{
    public class MegaMenuLinkItemViewModel
    {
        public string Title { get; set; }
        public string Reference { get; set; }
        public List<MegaMenuSolutionBusinessUnitViewModel> Solutions { get; set; }
    }
}