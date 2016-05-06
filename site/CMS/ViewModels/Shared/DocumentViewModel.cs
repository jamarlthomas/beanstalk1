using CMS.Mvc.ViewModels.DocumentBase;
using System;

namespace CMS.Mvc.ViewModels.Shared
{
    public class DocumentViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Abstract { get; set; }
        public string Copy { get; set; }
        public string HeroImage { get; set; }
        public DateTime DocumentPublishFrom { get; set; }
        public DocumentConstantViewModel Constant { get; set; }
        public bool map { get; set; }
    }
}