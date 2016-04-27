using System.Collections.Generic;
using CMS.Mvc.ViewModels.Product;

namespace CMS.Mvc.ViewModels.Shared.DownloadWidget
{
    public class DownloadButtonSectionViewModel
    {
        public string DownloadLabel { get; set; }

        public string TranslationAvailableLabel { get; set; }

        public string SelectLanguageLabel { get; set; }

        public List<DownloadLanguageLinkItemViewModel> TranslationAvailable { get; set; }

        public string CurrentLanguageId { get; set; }
    }
}
