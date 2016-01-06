using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ISolutionBusinessUnitProvider
    {
		List<SolutionBusinessUnit> GetSolutionBusinessUnits(string parentAlias);
		List<SolutionBusinessUnit> GetSolutionBusinessUnits();
        SolutionBusinessUnit GetSolutionBusinessUnit(string alias);
    }
}
