using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class FAQItemProvider : IFAQItemProvider
    {
        public List<FAQItem> GetFAQItemUnits(string alias)
        {
            return ContentHelper.GetDocChildrenByName<FAQItem>(FAQItem.CLASS_NAME, alias);
        }
    }
}