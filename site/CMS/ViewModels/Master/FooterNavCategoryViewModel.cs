using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.Master
{
    public class FooterNavCategoryViewModel
    {
        public string Title { get; set; }
        public List<FooterNavItemViewModel> FooterNavItems { get; set; }
    }
}