using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;
using System.Configuration;
using System.Text;

namespace CMS.Mvc.Providers
{
	public class SelectionFilterSearchProvider : ISelectionFilterSearchProvider
	{
		public SearchResult PerformSearch(SearchRequest request)
		{
			request.IndexName = "SelectionFilterSearch";
			request.RecordsOnPage = int.Parse(ConfigurationManager.AppSettings["SelectionFilterRecordOnPageCount"]);
			request.ClassNames = "custom.Product;custom.Document";
			request.SortOrder = string.Format("documentcreatedwhen {0}", !string.IsNullOrEmpty(request.SortOrder) && request.SortOrder.ToUpper().Equals("DESC") ? "DESC" : "ASC");
			request.AdditiveQuery = AdditiveQueryBuilder(request.DocumentTypesIds, request.SolutionsIds, request.Regions);
			return ContentHelper.PerformSearch(request);
		}

		private string AdditiveQueryBuilder(string documentTypesIds, string solutionsIds, string regions)
		{
			var query = new StringBuilder(string.Empty);
			if (!string.IsNullOrEmpty(documentTypesIds) || !string.IsNullOrEmpty(solutionsIds))
			{
				query.Append("+NodeParentID:(");
				var idsArray = string.Format("{0},{1}", documentTypesIds, solutionsIds).Split(',');
				for (int i = 0; i < idsArray.Length - 1; i++)
				{
					query.AppendFormat("(int){0} ", idsArray[i]);
				}
				query.AppendFormat("(int){0})", idsArray[idsArray.Length - 1]);
			}
			if (!string.IsNullOrEmpty(regions))
			{
				query.Append("+regions:(");
				var regionsArray = regions.Replace(' ', '+').Split(',');
				for (int i = 0; i < regionsArray.Length - 1; i++)
				{
					query.AppendFormat("{0} ", regionsArray[i]);
				}
				query.AppendFormat("{0})", regionsArray[regionsArray.Length - 1]);
			}
			return query.ToString();
		}
	}
}