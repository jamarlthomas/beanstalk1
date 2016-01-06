using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CMS.Mvc.ViewModels.Shared;


namespace CMS.Mvc.ViewModels.SelectionFilter
{
	public class SelectionFilterViewModel
	{
		public HeaderViewModel Header { get; set; }
		public SelectionFilterPageStateEnum State { get; set; }
		public List<CheckBoxViewModel> DocumentTypesList { get; set; }
		public List<CheckBoxViewModel> RegionsList { get; set; }
		public List<SBUFilterViewModel> SBUList { get; set; }
	}
}