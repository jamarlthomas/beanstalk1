using System.Collections.Generic;
using System.Web.Mvc;

namespace CMS.Mvc.ViewModels.Auxiliary
{
    public class AuxiliryViewModel
    {
        public List<AuxiliaryHyperlink> SBUs { get; set; }
        public List<AuxiliaryHyperlink> Solutions { get; set; }
        public List<AuxiliaryHyperlink> Products { get; set; }

        public List<AuxiliaryHyperlink> Documents { get; set; }
        public AuxiliaryHyperlink Home { get; set; }
        public AuxiliaryHyperlink NewsAndEvents { get; set; }
        public AuxiliaryHyperlink FAQ { get; set; }
        public AuxiliaryHyperlink GATC { get; set; }
        public AuxiliaryHyperlink SearchFilter { get; set; }
        public AuxiliaryHyperlink Insights { get; set; }
        public List<AuxiliaryHyperlink> News { get; set; }
        public AuxiliaryHyperlink Blogs { get; set; }
        public List<AuxiliaryHyperlink> BlogPosts { get; set; }
        public AuxiliaryHyperlink Contact { get; set; }
        public AuxiliaryHyperlink RateContentResults { get; set; }
        public AuxiliaryHyperlink GlobalSearch { get; set; }
        public AuxiliaryHyperlink TermsAndAcronyms { get; set; }
        public List<AuxiliaryHyperlink> Offices { get; set; }
        public List<AuxiliaryHyperlink> Generic { get; set; }
    }
}
