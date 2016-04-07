using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.SalesOffices
{
    public class CountryViewModel
    {
        public string CountryDisplayName { get; set; }

        public override string ToString()
        {
            return CountryDisplayName;
        }
    }
}