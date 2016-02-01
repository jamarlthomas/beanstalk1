using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class SolutionBusinessUnitProvider : ISolutionBusinessUnitProvider
    {
        public List<SolutionBusinessUnit> GetSolutionBusinessUnits(string parentAlias)
        {
            return ContentHelper.GetDocChildrenByName<SolutionBusinessUnit>(SolutionBusinessUnit.CLASS_NAME, parentAlias);
        }

		public List<SolutionBusinessUnit> GetSolutionBusinessUnits()
		{
			return ContentHelper.GetDocs<SolutionBusinessUnit>(SolutionBusinessUnit.CLASS_NAME);
		}

        public SolutionBusinessUnit GetSolutionBusinessUnit(string alias)
        {
            return ContentHelper.GetDocByName<SolutionBusinessUnit>(SolutionBusinessUnit.CLASS_NAME, alias);
        }
    }
}