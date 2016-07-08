using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.RateContent
{
    public class RateContentResultItemViewModel
    {
        public string DocumentTitle { get; set; }
        public string DocumentLink { get; set; }
        public string DocumentRateResultsLink { get; set; }
        public string ContactTitle { get; set; }
        public bool IsHelpful { get; set; }
        public string Message { get; set; }
        public DateTime Date { get; set; }
        public Guid DocumentGUID { get; set; }
    }
}