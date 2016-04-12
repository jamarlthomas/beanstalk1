using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared.Personalization;

namespace CMS.Mvc.ViewModels.Home
{
    public class HomeViewModel
    {
        public List<HeroContentViewModel> HeroContentList { get; set; }
        public List<PersonalizationCardViewModel> PrimaryTiles { get; set; }
        public List<PersonalizationCardViewModel> TrendingTiles { get; set; }
        public List<PersonalizationCardViewModel> PersonalizedTiles { get; set; }
    }
}