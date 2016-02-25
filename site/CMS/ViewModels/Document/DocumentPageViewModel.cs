using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.DocumentsViewModel
{
    public class DocumentPageViewModel
    {
        public DocumentViewModel Document { get; set; }
        public string MenuItemTitle { get; set; }
        public BreadCrumbViewModel BreadCrumb { get; set; }
        public SidebarViewModel SideBar { get; set; }
    }
}