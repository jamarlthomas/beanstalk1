﻿using System.Collections.Generic;

namespace CMS.DocumentEngine.Types
{
	public class SearchResult
	{
        public int ResultsCount { get; set; }
        public int PageCount { get; set; }
		public List<SearchResultItem> Items { get; set; }
	}
}
