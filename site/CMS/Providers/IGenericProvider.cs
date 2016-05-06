using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public interface IGenericProvider<T> where T: new ()
    {
        List<T> GetDocuments(string parentTitle);
        T GetDocument(string alias);
    }
}
