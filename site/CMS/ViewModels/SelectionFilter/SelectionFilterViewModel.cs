using CMS.Mvc.Infrastructure.Enums;
using System.Collections.Generic;


namespace CMS.Mvc.ViewModels.SelectionFilter
{
	public class SelectionFilterViewModel
	{
		public HeaderViewModel Header { get; set; }
		public SelectionFilterPageStateEnum State { get; set; }
		public List<CheckBoxViewModel> DocumentTypesList { get; set; }
		public List<CheckBoxViewModel> RegionsList { get; set; }
		public List<SBUFilterViewModel> SBUList { get; set; }
        public SelectionFilterSearchViewModel SearchResults { get; set; }
	}
}