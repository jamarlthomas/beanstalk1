using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class FAQTopicProvider : IFAQTopicProvider
    {
        public List<FAQTopic> GetFaqTopics()
        {
            return ContentHelper.GetDocs<FAQTopic>(FAQTopic.CLASS_NAME);
        }
    }
}