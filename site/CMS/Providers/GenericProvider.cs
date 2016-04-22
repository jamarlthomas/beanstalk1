using System.Collections.Generic;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;

namespace CMS.Mvc.Providers
{
    public class GenericProvider : IGenericProvider
    {

        public List<GenericPage> GetDocuments(string parentTitle)
        {
            return ContentHelper.GetDocChildrenByName<GenericPage>(GenericPage.CLASS_NAME, parentTitle);
        }


        public GenericPage GetDocument(string alias)
        {
            return ContentHelper.GetDocByName<GenericPage>(GenericPage.CLASS_NAME, alias);
        }
    }
}
