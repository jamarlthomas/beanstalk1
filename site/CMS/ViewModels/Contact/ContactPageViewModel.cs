using CMS.Mvc.ViewModels.Shared;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.Contact
{
    public class ContactPageViewModel
    {
        public string Title { get; set; }
        public string FirstNamePlaceholder { get; set; }
        public string LastNamePlaceholder { get; set; }
        public string CompanyNamePlaceholder { get; set; }
        public string EmailPlaceholder { get; set; }
        public string PhonePlaceholder { get; set; }
        public string SelectCountryPlaceholder { get; set; }
        public List<ContactCountryViewModel> Countries { get; set; }
        public string MessagePlaceholder { get; set; }
        public string NewsletterTitle { get; set; }
        public string NewsletterCheckboxLabel { get; set; }
        public string NewsletterPrivacyLabel { get; set; }
        public string NewsletterPrivacyLink { get; set; }
        public string SubmitLabel { get; set; }
        public string PromptLabel { get; set; }
        public string ViewSalesOfficesLabel { get; set; }

        public List<ContactRegionViewModel> Regions { get; set; }
        public EmergencyResponseViewModel EmergencyResponse { get; set; }
    }
}