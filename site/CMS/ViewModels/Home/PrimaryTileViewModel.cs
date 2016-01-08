﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.Home
{
	public class PrimaryTileViewModel
	{
		public string Title { get; set; }
        public string HoverContent { get; set; }
		public string Description { get; set; }
		public DateTime? Date { get; set; }
        public string HomeImage { get; set; }
		public string TypeName { get; set; }
	}
}