using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CMS.Mvc.ViewModels.Shared;


namespace CMS.Mvc.ViewModels.SelectionFilter
{
	public class SelectionFilterSearchItemViewModel
	{
		public string Title { get; set; }
		public string Description { get; set; }
		public string Type { get; set; }
		public string Link { get; set; }
	}
}