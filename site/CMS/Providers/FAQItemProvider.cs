using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class FAQItemProvider : IFAQItemProvider
    {
        public List<FAQItem> GetFAQItems(string alias, int limit)
        {
			return ContentHelper.GetDocChildrenByName<FAQItem>(FAQItem.CLASS_NAME, alias, limit);
        }

        public List<FAQItem> GetFAQItems()
        {
            return ContentHelper.GetDocs<FAQItem>(FAQItem.CLASS_NAME);
        }
    }
}