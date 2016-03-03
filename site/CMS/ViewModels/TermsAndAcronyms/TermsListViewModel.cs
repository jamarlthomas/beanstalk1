using System.Collections.Generic;
namespace CMS.Mvc.ViewModels.TermsAndAcronyms
{
    public class TermsListViewModel
    {
        public List<TermViewModel> results { get; set; }
        public int itemsPerPage { get; set; }
    }
}