using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.SalesOffices
{
    public class SalesOfficeViewModel
    {
        public string Title { get; set; }
        public string Address { get; set; }
        public string CountryName { get; set; }
        public string Phone { get; set; }
        public string PhoneLabel { get; set; }
        public string ServingCountriesLabel { get; set; }
        public List<CountryViewModel> ServingCountriesList { get; set; }
    }
}