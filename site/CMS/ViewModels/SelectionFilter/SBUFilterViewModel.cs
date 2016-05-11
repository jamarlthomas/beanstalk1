using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CMS.Mvc.ViewModels.Shared;


namespace CMS.Mvc.ViewModels.SelectionFilter
{
	public class SBUFilterViewModel
	{
		public string Title { get; set; }
		public List<CheckBoxViewModel> SolutionsList { get; set; }
        public string NodeAlias { get; set; }
	}
}