using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;
using System.Linq;

namespace CMS.Mvc.Providers
{
    public class DocumentProvider : IDocumentProvider
    {
        public List<Document> GetDocuments(string parentTitle)
        {
            return ContentHelper.GetDocChildrenByName<Document>(Document.CLASS_NAME, parentTitle);
        }

        public List<Document> GetHighlightedDocuments(string parentTitle)
        {
            return GetDocuments(parentTitle).Where(w => w.IsHighlightedOnInsightsPage).ToList();
        }

        public Document GetDocument(string alias)
        {
            return ContentHelper.GetDocByName<Document>(Document.CLASS_NAME, alias);
        }
    }
}