using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.Home
{
    public class HomeViewModel
    {
        public List<HeroContentViewModel> HeroContentList { get; set; }
        public List<PrimaryTileViewModel> PrimaryTiles { get; set; }
    }
}