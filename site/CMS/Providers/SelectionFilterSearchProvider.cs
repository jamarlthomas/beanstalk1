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
		public SearchResult PerformSearch(SelectionFilterSearchRequest request)
		{
			request.IndexName = "SelectionFilterSearch";
            request.RecordsOnPage = int.Parse(ConfigurationManager.AppSettings["SelectionFilterRecordOnPageCount"]);
            if (request.DocumentTypesIds == ConfigurationManager.AppSettings["DocumentDataSheetDocumentTypeId"])
            {
                request.ClassNames = "custom.Product;";
            }
            else
            {
                request.ClassNames = "custom.Product;custom.Document;custom.GenericPage;";
            }
			
            request.SortOrder = string.Format("documentcreatedwhen {0}", !string.IsNullOrEmpty(request.SortOrder) && request.SortOrder.ToUpper().Equals("NEWEST") ? "DESC" : "ASC");
			request.AdditiveQuery = AdditiveQueryBuilder(request.DocumentTypesIds, request.SolutionsIds, request.Regions);
			return ContentHelper.PerformSearch(request);
		}

		private string AdditiveQueryBuilder(SelectionFilterSearchRequest request)
		{
			var query = new StringBuilder(string.Empty);

			if (!string.IsNullOrEmpty(request.DocumentTypesIds))
			{
                query.Append("+NodeParentID:(");
                var idsArray = request.DocumentTypesIds.Split(new char[] { ',' }, System.StringSplitOptions.RemoveEmptyEntries);
				for (int i = 0; i < idsArray.Length - 1; i++)
				{
					query.AppendFormat("(int){0} ", idsArray[i]);
				}
				query.AppendFormat("(int){0})", idsArray[idsArray.Length - 1]);
			}
			if (!string.IsNullOrEmpty(request.Regions))
			{
				query.Append("+regions:(");
				var regionsArray = request.Regions.Replace(' ', '+').Split(',');
				for (int i = 0; i < regionsArray.Length - 1; i++)
				{
					query.AppendFormat("{0} ", regionsArray[i]);
				}
				query.AppendFormat("{0})", regionsArray[regionsArray.Length - 1]);
			}

            // If solutionIDs were given, add a filter for documents related to the given solutions.
            if (! request.IsNullSolutionId)
            {
                // Add RelatedSolution field condition
                List<string> solnGuids = new List<string>();
                foreach (string solnIdString in request.SolutionsIds.Split(new char[] { ',' }, System.StringSplitOptions.RemoveEmptyEntries))
                {
                    int solnId;
                    if (int.TryParse(solnIdString, out solnId))
                    {
                        Solution sln = ContentHelper.GetDocByNodeId<Solution>(solnId);
                        if (null != sln && sln.DocumentGUID != System.Guid.Empty)
                        {
                            solnGuids.Add(sln.DocumentGUID.ToString());
                        }
                    }
                }
                if (solnGuids.Count > 0)
                {
                    query.Append(" +RelatedSolution:(");
                    query.Append(string.Join(" ", solnGuids));
                    query.Append(")");
                }
            }

            if (request.DocumentTypesIds.Contains(ConfigurationManager.AppSettings["DocumentDataSheetDocumentTypeId"]))
            {
                // If no solution IDs given, include them all. 
                if (string.IsNullOrEmpty(request.SolutionsIds))
                {
                    var solutions = ContentHelper.GetDocs<Solution>(Solution.CLASS_NAME);
                    foreach (var sol in solutions)
                    {
                        request.SolutionsIds += sol.NodeID + ",";
                    }
                }
                query.Append(" (");
                query.Append(" +NodeParentID:(");
                //Solution IDs
                //query.Append()
                query.Append(")");
                query.Append(" +(");
                //document type
                query.Append(")");
                query.Append(")");

            }

			return query.ToString();
		}
	}
}