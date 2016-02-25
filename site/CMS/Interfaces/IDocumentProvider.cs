using CMS.DocumentEngine.Types;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IDocumentProvider
    {
        List<Document> GetDocuments(string parentTitle);
        List<Document> GetHighlightedDocuments(string parentTitle);
        Document GetDocument(string alias);
        List<BreadCrumbLinkItemViewModel> GetBreadcrumb(string name);
    }
}
