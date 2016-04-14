using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ISolutionProvider
    {
        List<Solution> GetSolutions(string alias);
        List<Solution> GetSolutions();
        List<Solution> GetSolutionItems();
        List<Solution> GetSolutionItems(string alias);

        Solution GetSolution(string alias);
    }
}
