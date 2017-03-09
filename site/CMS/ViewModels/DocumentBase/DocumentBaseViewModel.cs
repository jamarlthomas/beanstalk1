using System;
using CMS.Mvc.ViewModels.Shared.DownloadWidget;
using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.ViewModels.DocumentBase
{
    public class DocumentBaseViewModel
    {
        public string Title { get; set; }
        public string Abstract { get; set; }
        public DateTime DocumentPublishFrom { get; set; }
        public DocumentConstantViewModel Constant { get; set; }
        public string Copy { get; set; }
        public List<FAQItemViewModel> FAQList { get; set; }
        public DownloadButtonSectionViewModel DownloadButtonSection { get; set; }
    }

    
}