using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace CMS.Mvc.Providers
{
    public class PageTypeDisplayValueProvider : IPageTypeDisplayValueProvider
    {
        public PageTypeDisplayValue GetDisplayValue(string alias)
        {
            return ContentHelper.GetDocs<PageTypeDisplayValue>(PageTypeDisplayValue.CLASS_NAME).Where(x => x.GetStringValue("Title","").Equals(alias)).FirstOrDefault();
            
        }
    }
}