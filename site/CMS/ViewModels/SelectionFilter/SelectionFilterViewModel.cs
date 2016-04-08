using System.Collections.Generic;


namespace CMS.Mvc.ViewModels.SelectionFilter
{
    public class SelectionFilterViewModel
    {
        public string FilterLabel { get; set; }
        public string FilterByLabel { get; set; }
        public string SearchPlaceholder { get; set; }
        public string RegionHeader { get; set; }
        public string DocumentTypeHeader { get; set; }
        public string SolutionHeader { get; set; }
        public string ClearAllLabel { get; set; }
        public string ResultsLabel { get; set; }
        public string CurrentSelectionLabel { get; set; }
        public string NewestLabel { get; set; }
        public string OldestLabel { get; set; }
        public string LoadingLabel { get; set; }
        public string NoItemsLabel { get; set; }

        public HeaderViewModel Header { get; set; }
        public List<CheckBoxViewModel> DocumentTypesList { get; set; }
        public List<CheckBoxViewModel> RegionsList { get; set; }
        public List<SBUFilterViewModel> SBUList { get; set; }
    }
}