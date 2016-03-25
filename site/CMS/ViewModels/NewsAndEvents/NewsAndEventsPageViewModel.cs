using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.NewsAndEvents
{
    public class NewsAndEventsPageViewModel : NewsEventsAndBlogBasePageViewModel
    {
        public string AllNewsEventsSelectorValue { get; set; }
        public string NewsSelectorValue { get; set; }
        public string EventsSelectorValue { get; set; }
        public List<NewsAndEventViewModel> NewsAndEventsList { get; set; }
    }
}