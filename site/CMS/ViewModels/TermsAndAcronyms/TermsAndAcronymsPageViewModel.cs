﻿using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.TermsAndAcronyms
{
    public class TermsAndAcronymsPageViewModel
    {
        public string ParentTitle { get; set; }
        public string Title { get; set; }
        public string SearchLabel { get; set; }
        public string SortLabel { get; set; }
        public string FirstCharInAlphabetLabel { get; set; }
        public string LastCharInAlphabetLabel { get; set; }
        public List<TermViewModel> Terms { get; set; }

        public BreadCrumbViewModel BreadCrumb { get; set; }
        public SidebarViewModel SideBar { get; set; }
    }
}