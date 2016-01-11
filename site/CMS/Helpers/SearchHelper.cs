using CMS.DocumentEngine.Types;
using CMS.Localization;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace CMS.Mvc.Helpers
{
	public static class SearchHelper
	{
		public static List<SearchResult> PerformSearch(string searchString)
		{
			Search.SearchIndexInfo index = Search.SearchIndexInfoProvider.GetSearchIndexInfo("PageIndex");
			DataSet results = null;
			if (index != null)
			{
				Search.SearchParameters parameters = new Search.SearchParameters()
				{
					SearchFor = searchString,
					SearchSort = null,
					Path = null,
					ClassNames = null,
					CurrentCulture = LocalizationContext.CurrentCulture.CultureCode,
					DefaultCulture = null,
					CombineWithDefaultCulture = false,
					CheckPermissions = false,
					SearchInAttachments = false,
					User = null,
					SearchIndexes = index.IndexName,
					NumberOfResults = 100,
					AttachmentWhere = null,
					AttachmentOrderBy = null,
					DisplayResults = 100,
					NumberOfProcessedResults = 100,
					StartingPosition = 0,
				};

				results = Search.SearchHelper.Search(parameters);
			}

			if (results == null) return new List<SearchResult>();
			return results.Tables[0].AsEnumerable().Select(s => new SearchResult
			{
				Title = s.Field<string>("Title"),
				Content = s.Field<string>("Content"),
				Image = s.Field<string>("Image"),
				//Date = s.Field<DateTime>("Date")
			}).ToList();
		}
	}
}