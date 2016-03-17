using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.NewsAndEvents
{
    public class NewsAndEventViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string DocumentUrlPath { get; set; }
        public string Image { get; set; }
        public DateTime Date { get; set; }
    }
}