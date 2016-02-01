using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CMS.Mvc.ViewModels.Shared;


namespace CMS.Mvc.ViewModels.SelectionFilter
{
	public class SelectionFilterSearchViewModel
	{
		public int pagecount { get; set; }
		public List<SelectionFilterSearchItemViewModel> results { get; set; }
	}
}