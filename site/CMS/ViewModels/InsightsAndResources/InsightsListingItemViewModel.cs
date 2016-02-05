using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.InsightsAndResources
{
	public class InsightsListingItemViewModel
	{
		public string Title { get; set; }
		public List<LinkViewModel> Links { get; set; }
	}
}