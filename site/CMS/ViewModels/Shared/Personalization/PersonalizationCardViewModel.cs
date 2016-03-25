using System;
using System.Web;

namespace CMS.Mvc.ViewModels.Shared.Personalization
{
    public class PersonalizationCardViewModel
    {
        public string Reference { get; set; }
        public string TileTitle { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string HomeImage { get; set; }
    }
}
