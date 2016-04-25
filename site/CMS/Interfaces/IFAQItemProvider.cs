using System.Collections.Generic;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Interfaces
{
    public interface IFAQItemProvider
    {
        List<FAQItem> GetFAQItems(string alias, int limit);
        List<FAQItem> GetFAQItems();

        List<FAQItem> GetFAQItems(string faqs);
    }
}