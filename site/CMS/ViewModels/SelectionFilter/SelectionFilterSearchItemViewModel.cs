using System;
using CMS.Mvc.ViewModels.Shared;


namespace CMS.Mvc.ViewModels.SelectionFilter
{
    public class SelectionFilterSearchItemViewModel
    {
        public string Title { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string Link { get; set; }
        public string Image { get; set; }
        public DateTime PostedDate { get; set; }
        public SolutionViewModel Solution { get; set; }
        public SBUViewModel SBU { get; set; }
    }
}