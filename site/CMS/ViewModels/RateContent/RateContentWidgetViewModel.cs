using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.RateContent
{
    public class RateContentWidgetViewModel
    {
        public string Question { get; set; }
        public string YesLabel { get; set; }
        public string NoLabel { get; set; }
        public string PopupTitle { get; set; }
        public string PopupDescription { get; set; }
        public string PopupTextareaPlaceholder { get; set; }
        public string PopupSubmitLabel { get; set; }
        public Guid DocumentGuid { get; set; }
    }
}