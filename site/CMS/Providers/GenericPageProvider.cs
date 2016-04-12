using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace CMS.Mvc.Providers
{
    public class GenericPageProvider : IGenericPageProvider
    {
        public List<GenericPage> GetChildGenericPages(string alias)
        {
            return ContentHelper.GetDocChildrenByName<GenericPage>(GenericPage.CLASS_NAME, alias);
        }

        public GenericPage GetFirstChildGenericPage(string alias)
        {
            return GetChildGenericPages(alias).FirstOrDefault();
        }
    }
}