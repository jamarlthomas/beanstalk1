using System.Collections.Generic;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System;
using System.Linq;
using System.Web;

namespace CMS.Mvc.Providers
{
    public class SolutionProvider : ISolutionProvider
    {
        public List<Solution> GetSolutionItems(string alias)
        {
            return ContentHelper.GetDocChildrenByName<Solution>(Solution.CLASS_NAME, alias);
        }

		public List<Solution> GetSolutionItems()
		{
			return ContentHelper.GetDocs<Solution>(Solution.CLASS_NAME);
		}
    }
}