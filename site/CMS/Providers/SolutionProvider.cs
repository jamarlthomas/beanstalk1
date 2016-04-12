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

        public List<Solution> GetSolutions()
        {
            return ContentHelper.GetDocs<Solution>(Solution.CLASS_NAME);
        }

        public Solution GetSolution(string alias)
        {
            return ContentHelper.GetDocByName<Solution>(Solution.CLASS_NAME, alias);
        }
    }
}