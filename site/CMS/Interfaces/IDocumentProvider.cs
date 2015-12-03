using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IDocumentProvider
    {
        List<Document> GetDocumentUnits(string alias);
    }
}
