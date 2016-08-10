using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.GlobalSearch
{
    public class GlobalSearchPageViewModel
    {
        public string Title { get; set; }
        public string ResultsForLabel { get; set; }
        public string SearchTerm { get; set; }
        public int ResultsCount { get; set; }
        public int PageCount { get; set; }
        public List<ResultItemViewModel> Results { get; set; }
        public PaginationViewModel Pagination { get; set; }
        public string NoResultsLabel { get; set; }
    }
}