using CMS.DocumentEngine.Types;
using System.Collections.Generic;
using CMS.DocumentEngine;

namespace CMS.Mvc.Interfaces
{
    public interface ISolutionBusinessUnitProvider
    {
		List<SolutionBusinessUnit> GetSolutionBusinessUnits(string parentAlias);
        List<SolutionBusinessUnit> GetSolutionBusinessUnits();
        List<SolutionBusinessUnit> GetParentOrDefaultSBUs(TreeNode node);
        SolutionBusinessUnit GetSolutionBusinessUnit(string alias);
    }
}
