using System;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared.Personalization;
using CMS.Mvc.ViewModels.SBU;

namespace CMS.Mvc.ViewModels.Shared
{
    public class SBUViewModel : TileViewModel
    {
        public string HeroImage { get; set; }
        public string HeroImageTitle { get; set; }
        public string HeroImageSubtitle { get; set; }
        public string DocumentsDescription { get; set; }
        public string FAQDescription { get; set; }
        public string FAQList { get; set; }
        public string ViewAllDocumentsLink { get; set; }
        public string Theme { get; set; }
        public Guid DocumentGUID { get; set; }
        public string NodeGUID { get; set; }
        public List<FAQItemViewModel> FAQs { get; set; }
        public List<DocumentTypeViewModel> DocumentTypes { get; set; }
        public List<TileViewModel> Solutions { get; set; }
        public string Content { get; set; }
    }
}
