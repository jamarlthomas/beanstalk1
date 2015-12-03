using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.SBU
{
    public class FAQItemViewModel
    {
        public string Question { get; set; }
        public string Answer { get; set; }
        public string RelatedSBU { get; set; }
        public string FAQTopic { get; set; }
    }
}