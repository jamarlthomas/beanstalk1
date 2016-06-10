using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ISolutionProvider
    {
        List<Solution> GetSolutions(string alias);
        List<Solution> GetSolutions();
        Solution GetSolution(string alias, string parent);
    }
}
