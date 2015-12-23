using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.SBU
{
    public class SBUViewModel
    {
        public string Title { get; set; }
		public string HeroImage { get; set; }
		public string HeroImageTitle { get; set; }
		public string HeroImageSubtitle { get; set; }
        public string Description { get; set; }
        public string DocumentsDescription { get; set; }
        public string FAQDescription { get; set; }
        public string FAQList { get; set; }
        public string Theme { get; set; }
        public List<FAQItemViewModel> FAQs { get; set; }
        public List<DocumentTypeViewModel> DocumentTypes { get; set; }
        public List<SolutionViewModel> Solutions { get; set; }
    }
}