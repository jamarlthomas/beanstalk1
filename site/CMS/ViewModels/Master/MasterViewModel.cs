using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.Master
{
    public class MasterViewModel
    {
        public List<PagesMenuItemViewModel> UtilityNavList { get; set; }
        public List<ContentMenuItemViewModel> MainNavList { get; set; }
        public FooterViewModel Footer { get; set; }
        public CultureInfo SelectedCulture { get; set; }
    }
}