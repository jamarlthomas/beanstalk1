using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class DocumentTypeProvider : IDocumentTypeProvider
    {
		public List<DocumentType> GetDocumentTypeUnits(string alias, int limit)
        {
            return ContentHelper.GetDocChildrenByName<DocumentType>(DocumentType.CLASS_NAME, alias, limit);
        }
    }
}