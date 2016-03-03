using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.NewsAndEvents
{
    public class NewsAndEventsPageViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public List<TileViewModel> Tiles { get; set; }
    }
}