using CMS.DocumentEngine.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.SBU
{
    public class SBUViewModel
    {
        public string Title { get; set; }
        public string HeroImage { get; set; }
        public string LeftDescription { get; set; }
        public string RightDescription { get; set; }
        public string DocumentsDescription { get; set; }
        public string FAQDescription { get; set; }
        public string FAQList { get; set; }
        public string Theme { get; set; }
        public List<AnchorMenuItemViewModel> AnchorMenu { get; set; }
        public List<FAQItemViewModel> FAQs { get; set; }
        public List<DocumentTypeViewModel> DocumentTypes { get; set; }
        public List<SolutionViewModel> Solutions { get; set; }
    }
}