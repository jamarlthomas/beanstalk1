using System.Collections.Generic;
using System.Linq;
using CMS.Mvc.Helpers;

namespace CMS.Mvc.Providers
{
    public class GenericProvider<T>  : IGenericProvider<T> where T :  DocumentEngine.TreeNode, new()
    {

        public List<T> GetDocuments(string parentTitle) 
        {
            return ContentHelper.GetDocChildrenByName<T>(new T().ClassName, parentTitle);
        }


        public T GetDocument(string alias)
        {
            if (string.IsNullOrWhiteSpace(alias))
            {
                return ContentHelper.GetDocs<T>(new T().ClassName).FirstOrDefault();
            }
            return ContentHelper.GetDocByName<T>(new T().ClassName, alias);
        }
    }
}
