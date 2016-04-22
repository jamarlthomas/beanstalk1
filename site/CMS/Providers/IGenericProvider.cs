using System.Collections.Generic;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Providers
{
    public interface IGenericProvider
    {
        List<GenericPage> GetDocuments(string parentTitle);
        GenericPage GetDocument(string alias);
    }
}
