using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.ViewModels.Product
{
    public class DownloadWidgetViewModel
    {
        public string Title { get; set; }

        public string TileImage { get; set; }
        public string Description { get; set; }
        public List<LinkViewModel> AvailableIn { get; set; }
        public List<DownloadLanguageLinkItemViewModel> TranslationAvailable { get; set; }
        public string DownloadLink { get; set; }
    }
}
