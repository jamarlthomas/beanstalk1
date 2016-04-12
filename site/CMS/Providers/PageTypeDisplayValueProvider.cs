using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class PageTypeDisplayValueProvider : IPageTypeDisplayValueProvider
    {
        public PageTypeDisplayValue GetDisplayValue(string alias)
        {
            return ContentHelper.GetDocByName<PageTypeDisplayValue>(PageTypeDisplayValue.CLASS_NAME, alias);
        }
    }
}