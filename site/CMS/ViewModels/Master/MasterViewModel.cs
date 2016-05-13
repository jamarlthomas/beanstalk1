using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.Master
{
    public class MasterViewModel
    {
        public List<PagesMenuItemViewModel> UtilityNavList { get; set; }
        public List<ContentMenuItemViewModel> MainNavList { get; set; }
        public string SelectedCulture { get; set; }
        public string Title { get; set; }
        public string GlobalSearchQuery { get; set; }

        public IEnumerable<CultureLinkViewModel> AvailableCultures { get; set; }
    }
}