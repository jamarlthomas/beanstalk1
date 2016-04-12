using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.NewsAndEvents
{
    public class NewsAndEventsPageViewModel : NewsEventsAndBlogBasePageViewModel
    {
        public List<string> Types { get; set; }
        public List<NewsAndEventViewModel> NewsAndEventsList { get; set; }
    }
}