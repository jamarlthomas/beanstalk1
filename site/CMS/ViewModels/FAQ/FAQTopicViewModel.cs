using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.ViewModels.FAQ
{
    public class FAQTopicViewModel
    {
        public string Name { get; set; }
        public string Id { get; set; }
        public List<FAQItemViewModel> Items { get; set; }
    }
}