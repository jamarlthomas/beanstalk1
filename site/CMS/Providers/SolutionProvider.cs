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
        public List<Solution> GetSolutions(string alias)
        {
            return ContentHelper.GetDocChildrenByName<Solution>(Solution.CLASS_NAME, alias);
        }
        public List<Solution> GetSolutionsByParent(string alias, string parentPath)
        {
            return ContentHelper.GetDocChildrenByNameWithParent<Solution>(Solution.CLASS_NAME, alias, parentPath);
        }

        public List<Solution> GetSolutions()
        {
            return ContentHelper.GetDocs<Solution>(Solution.CLASS_NAME);
        }

        public Solution GetSolution(string alias, string parent)
        {
            return ContentHelper.GetDocByNameAndParent<Solution>(Solution.CLASS_NAME, alias, parent);
        }
    }
}