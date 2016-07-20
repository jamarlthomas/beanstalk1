using System;

namespace CMS.Mvc.ViewModels.Shared
{
    public class TileViewModel
    {
        public string Reference { get; set; }
        public string TileTitle { get; set; }
        public DateTime? Date { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string HomeImage { get; set; }

        public string Copy { get; set; }
        public string DocumentRoutePath { get; set; }
        public string HoverContent { get; set; }
        public string TypeName { get; set; }
        public bool? IsTrending { get; set; }
    }
}