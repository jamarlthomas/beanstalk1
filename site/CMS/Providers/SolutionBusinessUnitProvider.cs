using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;
using System.Linq;
using CMS.DocumentEngine;

namespace CMS.Mvc.Providers
{
    public class SolutionBusinessUnitProvider : ISolutionBusinessUnitProvider
    {
        public List<SolutionBusinessUnit> GetSolutionBusinessUnits()
        {
            return ContentHelper.GetDocs<SolutionBusinessUnit>(SolutionBusinessUnit.CLASS_NAME);
        }

        public List<SolutionBusinessUnit> GetSolutionBusinessUnits(string parentAlias)
        {
            return ContentHelper.GetDocChildrenByName<SolutionBusinessUnit>(SolutionBusinessUnit.CLASS_NAME, parentAlias);
        }

        public SolutionBusinessUnit GetSolutionBusinessUnit(string alias)
        {
            return ContentHelper.GetDocByName<SolutionBusinessUnit>(SolutionBusinessUnit.CLASS_NAME, alias);
        }

        public List<SolutionBusinessUnit> GetParentOrDefaultSBUs(TreeNode node)
        {
            if (node.Parent is SolutionBusinessUnit)
            {
                return new List<SolutionBusinessUnit> { node.Parent as SolutionBusinessUnit };
            }
            else if (node.Parent is Solution)
            {
                return new List<SolutionBusinessUnit>() { node.Parent.Parent as SolutionBusinessUnit };
            }
            else
            {
                return GetSolutionBusinessUnits().Where(w => !string.IsNullOrEmpty(w.Title)).ToList();
            }
        }
    }
}