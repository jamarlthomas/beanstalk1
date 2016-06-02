using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.DownloadWidget;

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
        public DownloadButtonSectionViewModel DownloadButtonSection { get; set; }
        public DownloadLanguageLinkItemViewModel SelectedTranslation { get; set; }
    }
}
