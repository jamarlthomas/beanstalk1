﻿using System;
using CMS.Mvc.ViewModels.Shared.DownloadWidget;

namespace CMS.Mvc.ViewModels.DocumentBase
{
    public class DocumentBaseViewModel
    {
        public string Title { get; set; }
        public string Abstract { get; set; }
        public DateTime DocumentPublishFrom { get; set; }
        public DocumentConstantViewModel Constant { get; set; }
        public string Copy { get; set; }
        public DownloadButtonSectionViewModel DownloadButtonSection { get; set; }
    }

    
}