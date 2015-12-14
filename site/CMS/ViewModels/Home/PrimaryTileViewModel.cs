using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.Home
{
	public class PrimaryTileViewModel
	{
		public string Title { get; set; }
		public string HeaderDescription { get; set; }
		public string Description { get; set; }
		public DateTime? Date { get; set; }
		public string Image { get; set; }
		public string TypeName { get; set; }
	}
}