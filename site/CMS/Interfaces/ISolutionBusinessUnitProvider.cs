using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ISolutionBusinessUnitProvider
    {
		List<SolutionBusinessUnit> GetSolutionBusinessUnits();
		List<SolutionBusinessUnit> GetSolutionBusinessUnits(string parentAlias);
        SolutionBusinessUnit GetSolutionBusinessUnit(string alias);
    }
}
