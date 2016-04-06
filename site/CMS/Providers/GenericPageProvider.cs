using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class GenericPageProvider : IGenericPageProvider
    {
        public List<GenericPage> GetChildGenericPages(string alias)
        {
            return ContentHelper.GetDocChildrenByName<GenericPage>(GenericPage.CLASS_NAME, alias);
        }
    }
}