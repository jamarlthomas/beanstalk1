using CMS.Mvc.ViewModels.DocumentBase;
using System;
using System.Collections.Generic;

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
        public string DocumentRoutePath { get; set; }
        public List<FAQItemViewModel> FAQList { get; set; }
        public string NodeGUID { get; set; }
    }
}