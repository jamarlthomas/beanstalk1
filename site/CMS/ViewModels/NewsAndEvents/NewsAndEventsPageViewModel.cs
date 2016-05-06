using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;
using System;

namespace CMS.Mvc.ViewModels.NewsAndEvents
{
    public class NewsAndEventsPageViewModel : NewsEventsAndBlogBasePageViewModel
    {
        public List<string> Types { get; set; }
        public List<NewsAndEventViewModel> NewsAndEventsList { get; set; }
        public List<string> Dates { get; set; }
    }
}