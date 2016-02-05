using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;

namespace CMS.Mvc.ViewModels.InsightsAndResources
{
    public class InsightsAndResourcesViewModel
    {
        public InsightsAndResourcesViewModel()
        {
            SideBar = new SidebarViewModel();
        }

        public string Title { get; set; }
        public string Description { get; set; }
        public List<InsightsListingItemViewModel> InsightsListing { get; set; }
        public List<TileViewModel> Tiles { get; set; }
        public SidebarViewModel SideBar { get; set; }
    }
}