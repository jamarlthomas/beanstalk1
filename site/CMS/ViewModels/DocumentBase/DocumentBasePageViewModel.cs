using System;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;

namespace CMS.Mvc.ViewModels.DocumentBase
{
    public class DocumentBasePageViewModel
    {
        public DocumentBaseViewModel Document { get; set; }
        public string MenuItemTitle { get; set; }
        public BreadCrumbViewModel BreadCrumb { get; set; }
        public SidebarViewModel SideBar { get; set; }
        public Guid DocumentGuid { get; set; }
    }
}