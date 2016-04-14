using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.SalesOffices
{
    public class RegionViewModel
    {
        public string Title { get; set; }
        public string MapImage { get; set; }
        public List<SalesOfficeViewModel> Offices { get; set; }
        public EmergencyResponseViewModel EmergencyResponse { get; set; }
    }
}