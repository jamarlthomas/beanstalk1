using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.Home
{
    public class HomeViewModel
    {
        public List<HeroContentViewModel> HeroContentList { get; set; }
        public List<TileViewModel> PrimaryTiles { get; set; }
    }
}