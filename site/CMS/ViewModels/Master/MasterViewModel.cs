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
        public string SelectedCulture { get; set; }
        public string Title { get; set; }
        public string GlobalSearchQuery { get; set; }
        public string CookieMessage { get; set; }
        public IEnumerable<CultureLinkViewModel> AvailableCultures { get; set; }
    }
}