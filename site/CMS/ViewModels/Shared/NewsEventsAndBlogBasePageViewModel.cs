using CMS.DocumentEngine;
using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared.Personalization;

namespace CMS.Mvc.ViewModels.Shared
{
    public abstract class NewsEventsAndBlogBasePageViewModel : PersonalizationCardViewModel
    {
        //public string Title { get; set; }
        //public string Description { get; set; }
        public string SortNewestLabel { get; set; }
        public string SortOldestLabel { get; set; }
        public string ReadMoreLabel { get; set; }
        public string TilesLabel { get; set; }
        public string ViewAllLabel { get; set; }
        public string PostedLabel { get; set; }
        public string FilterByLabel { get; set; }
        public string SortByLabel { get; set; }
        public List<TileViewModel> Tiles { get; set; }
    }
}
