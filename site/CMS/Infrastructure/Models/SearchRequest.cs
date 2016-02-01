using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.Infrastructure.Models
{
	public class SearchRequest
	{
		public string Regions { get; set; }
		public string DocumentTypesIds { get; set; }
		public string SBUId { get; set; }
		public string SolutionsIds { get; set; }
		public string SortOrder { get; set; }
		public int? PageNumber { get; set; }
		public string Query { get; set; }

		public string IndexName { get; set; }
		public int RecordsOnPage { get; set; }
		public string ClassNames { get; set; }
		public string AdditiveQuery { get; set; }
	}
}