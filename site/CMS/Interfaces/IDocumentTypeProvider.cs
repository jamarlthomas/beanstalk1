using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IDocumentTypeProvider
    {
		List<DocumentType> GetDocumentTypes(string parantTitle, int limit);
		List<DocumentType> GetDocumentTypes();
    }
}
