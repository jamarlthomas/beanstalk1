using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.GlobalSearch
{
    public class ResultItemViewModel
    {
        public string DocumentNamePath { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public string Image { get; set; }
        public string Type { get; set; }
    }
}