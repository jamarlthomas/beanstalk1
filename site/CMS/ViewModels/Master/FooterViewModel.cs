using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.Master
{
    public class FooterViewModel
    {
        public List<FooterAboutViewModel> FooterAboutItems { get; set; }
        public List<FooterCareersViewModel> FooterCareersItems { get; set; }
        public List<FooterNewsEventsViewModel> FooterNewsEventsItems { get; set; }
    }
}