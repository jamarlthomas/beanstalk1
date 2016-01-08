using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.Shared
{
	public class ProductViewModel
    {
        public string Title { get; set; }
		public string Subtitle { get; set; }
		public string TileImage { get; set; }
		public string Description { get; set; }
		public string Region { get; set; }
		public string Benefits { get; set; }
		public string Dosage { get; set; }
		public string Characteristics { get; set; }
		public string Approvals { get; set; }
		public string HandlingInformation { get; set; }
		public string Comparison { get; set; }
    }
}