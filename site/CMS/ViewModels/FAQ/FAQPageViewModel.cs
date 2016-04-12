using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.Personalization;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;

namespace CMS.Mvc.ViewModels.FAQ
{
    public class FAQPageViewModel : PersonalizationCardViewModel
    {
        public SidebarViewModel SideBar { get; set; }
        //public string Title { get; set; }
        public string MenuSelectedItem { get; set; }
        public string SortByLabel { get; set; }
        public string ViewAllLabel { get; set; }
        public BreadCrumbViewModel BreadCrumb { get; set; }
        public List<FAQTopicViewModel> Topics { get; set; }
    }
}