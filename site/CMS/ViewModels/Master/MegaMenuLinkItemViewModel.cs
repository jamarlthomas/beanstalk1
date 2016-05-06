using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.ViewModels.Master
{
    public class MegaMenuLinkItemViewModel : LinkViewModel
    {
        public List<MegaMenuSubLinkItemViewModel> Solutions { get; set; }
        public string Title { get; set; }
    }
}