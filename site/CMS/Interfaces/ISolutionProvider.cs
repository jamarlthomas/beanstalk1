using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ISolutionProvider
    {
        List<Solution> GetSolutionItems(string alias);
		List<Solution> GetSolutionItems();
		Solution GetSolution(string alias);
    }
}
