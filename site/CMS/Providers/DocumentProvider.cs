using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class DocumentProvider : IDocumentProvider
    {
        public List<Document> GetDocumentUnits(string alias)
        {
            return ContentHelper.GetDocChildrenByName<Document>(Document.CLASS_NAME, alias);
        }
    }
}