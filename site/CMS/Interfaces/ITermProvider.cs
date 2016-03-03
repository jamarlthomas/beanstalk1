using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ITermProvider
    {
        List<Term> GetTerms(string parentAlias);
    }
}
