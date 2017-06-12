using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.Home
{
    public class HeroContentViewModel
    {
        public string Title { get; set; }
        public string Copy { get; set; }
        public string Image { get; set; }
        public string Handedness { get; set; }
        public string RelatedDocument { get; set; }
    }
}