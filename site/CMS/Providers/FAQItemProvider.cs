using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;
using System.Linq;

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


        public List<FAQItem> GetFAQItems(string faqs)
        {
            return ContentHelper.GetDocsByGuids<FAQItem>(UtilsHelper.ParseGuids(faqs));
        }
        public List<FAQItem> GetFAQItemsBySBU(string guid)
        {
            return ContentHelper.GetDocs<FAQItem>(FAQItem.CLASS_NAME).Where(x => x.RelatedSBU.Contains(guid)).ToList();
        }
    }
}