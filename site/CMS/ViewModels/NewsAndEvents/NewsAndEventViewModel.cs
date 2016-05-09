using System;

namespace CMS.Mvc.ViewModels.NewsAndEvents
{
    public class NewsAndEventViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string DocumentRoutePath { get; set; }
        public string Image { get; set; }
        public DateTime Date { get; set; }
    }
}