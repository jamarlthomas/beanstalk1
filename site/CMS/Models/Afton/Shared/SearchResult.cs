using System;
using CMS;
using CMS.Helpers;
using CMS.DataEngine;
using CMS.DocumentEngine.Types;
using CMS.DocumentEngine;

namespace CMS.DocumentEngine.Types
{
	public class SearchResult
	{
		public string Title { get; set; }
		public string Content { get; set; }
		public string Image { get; set; }
		public DateTime Date { get; set; }
	}
}
