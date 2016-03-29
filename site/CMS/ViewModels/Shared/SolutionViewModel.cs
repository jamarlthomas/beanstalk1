using System;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Solution;

namespace CMS.Mvc.ViewModels.Shared
{
    public class SolutionViewModel
    {
        public string Title { get; set; }
        public string Subtitle { get; set; }
        public string HeroImage { get; set; }
        public string NavigationIcon { get; set; }
        public string Description { get; set; }
        public string HomeImage { get; set; }
        public string ParentName { get; set; }
        public List<ProductViewModel> Products { get; set; }
        public BreadCrumbViewModel BreadCrumb { get; set; }
        public SidebarViewModel SideBar { get; set; }
        public SolutionConstantsViewModel Constants { get; set; }
    }
}