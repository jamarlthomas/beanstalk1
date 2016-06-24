using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.SiteMap
{
    public class SiteMapViewModel
    {
        public List<SiteMapHyperLink> SBUs { get; set; }
        public List<SiteMapHyperLink> Solutions { get; set; }
        public List<SiteMapHyperLink> Products { get; set; }

        public List<SiteMapHyperLink> Documents { get; set; }
        public SiteMapHyperLink Home { get; set; }
        public SiteMapHyperLink NewsAndEvents { get; set; }
        public SiteMapHyperLink FAQ { get; set; }
        public SiteMapHyperLink GATC { get; set; }
        public SiteMapHyperLink SearchFilter { get; set; }
        public SiteMapHyperLink Insights { get; set; }
        public List<SiteMapHyperLink> News { get; set; }
        public SiteMapHyperLink Blogs { get; set; }
        public List<SiteMapHyperLink> BlogPosts { get; set; }
        public SiteMapHyperLink Contact { get; set; }
        public SiteMapHyperLink RateContentResults { get; set; }
        public SiteMapHyperLink GlobalSearch { get; set; }
        public SiteMapHyperLink TermsAndAcronyms { get; set; }
        public List<SiteMapHyperLink> Offices { get; set; }
        public List<SiteMapHyperLink> Generic { get; set; }
    }
}
