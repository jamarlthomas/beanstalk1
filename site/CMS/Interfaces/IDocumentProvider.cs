using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IDocumentProvider
    {
		List<Document> GetDocuments(string parentTitle);
		List<Document> GetHighlightedDocuments(string parentTitle);
    }
}
