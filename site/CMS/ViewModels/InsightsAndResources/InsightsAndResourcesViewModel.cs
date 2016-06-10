using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.InsightsAndResources
{
    public class InsightsAndResourcesViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string HeroImage { get; set; }
        public string Headline { get; set; }
        public string Subheadline { get; set; }
        public List<InsightsListingItemViewModel> InsightsListing { get; set; }
        public List<TileViewModel> Tiles { get; set; }
        public string NodeGUID { get; set; }
    }
}