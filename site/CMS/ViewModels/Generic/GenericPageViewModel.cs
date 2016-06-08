using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using System;

namespace CMS.Mvc.ViewModels.Generic
{
    public class GenericPageViewModel
    {
        public DocumentViewModel Document { get; set; }
        //public string MenuItemTitle { get; set; }
        public BreadCrumbViewModel BreadCrumb { get; set; }
        public SidebarViewModel SideBar { get; set; }
        public Guid DocumentGUID { get; set; }
    }
}
