using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.ViewModels.Product
{
    public class ContactUsViewModel
    {
        public List<RegionViewModel> Regions { get; set; }
        public string Header { get; set; }
        public string Text { get; set; }
    }
}
