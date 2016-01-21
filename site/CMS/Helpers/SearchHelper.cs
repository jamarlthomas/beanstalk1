using CMS.DocumentEngine.Types;
using CMS.Localization;
using CMS.Mvc.Infrastructure.Models;
using CMS.Search;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace CMS.Mvc.Helpers
{
	public static class SearchHelper
	{
		public static SearchResult PerformSearch(SearchRequest request)
		{
			DocumentSearchCondition docCondition = new DocumentSearchCondition
			{
				Culture = LocalizationContext.CurrentCulture.CultureCode,
				ClassNames = request.ClassNames,
			};

			var condition = new SearchCondition(request.AdditiveQuery, SearchModeEnum.AllWords, SearchOptionsEnum.FullSearch, docCondition);
			var searchText = SearchSyntaxHelper.CombineSearchCondition(request.Query, condition);

			var parameters = new Search.SearchParameters
			{
				SearchFor = searchText,
				SearchSort = request.SortOrder,
				Path = "/%",
				ClassNames = null,
				CurrentCulture = LocalizationContext.CurrentCulture.CultureCode,
				DefaultCulture = null,
				CombineWithDefaultCulture = false,
				CheckPermissions = false,
				SearchInAttachments = false,
				User = null,
				SearchIndexes = request.IndexName,
				NumberOfResults = Int32.MaxValue,
				AttachmentWhere = null,
				AttachmentOrderBy = null,
				DisplayResults = request.RecordsOnPage,
				NumberOfProcessedResults = Int32.MaxValue,
				StartingPosition = request.PageNumber.HasValue ? (request.PageNumber.Value - 1) * request.RecordsOnPage : 0,
			};

			var results = Search.SearchHelper.Search(parameters);
			if (results == null) return new SearchResult();
			return new SearchResult
			{
				PageCount = (int)Math.Ceiling(1d * parameters.NumberOfResults / request.RecordsOnPage),
				Items = results.Tables[0].AsEnumerable().Select(s => new SearchResultItem
				{
					Title = s.Field<string>("Title"),
					Content = s.Field<string>("Content"),
					Image = s.Field<string>("Image"),
					Date = s.Field<string>("Created")
				}).ToList()
			};
		}
	}
}