using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.Personalization;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.TermsAndAcronyms
{
    public class TermsAndAcronymsPageViewModel : PersonalizationCardViewModel
    {
        public string ParentTitle { get; set; }
        //public string Title { get; set; }
        public string SearchLabel { get; set; }
        public string SortLabel { get; set; }
        public string FirstCharInAlphabetLabel { get; set; }
        public string LastCharInAlphabetLabel { get; set; }
        public string LoadingLabel { get; set; }
        public string NoItemsLabel { get; set; }

        public BreadCrumbViewModel BreadCrumb { get; set; }
        public SidebarViewModel SideBar { get; set; }
    }
}