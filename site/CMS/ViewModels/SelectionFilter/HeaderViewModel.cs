using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CMS.Mvc.ViewModels.Shared;


namespace CMS.Mvc.ViewModels.SelectionFilter
{
    public class HeaderViewModel
    {
        public string Title { get; set; }
        public string ViewInsightsResourcesLink { get; set; }
        public string ViewInsightsResourcesLabel { get; set; }
        public BreadCrumbViewModel BreadCrumb { get; set; }
    }
}