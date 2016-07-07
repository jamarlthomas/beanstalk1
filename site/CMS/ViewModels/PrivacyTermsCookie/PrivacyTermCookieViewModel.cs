using System;


namespace CMS.Mvc.ViewModels.PrivacyTermsCookie
{
    public class PrivacyTermCookieViewModel
    {
        public string PrivacyHeader { get; set; }
        public string PrivacyContent { get; set; }
        public string CookieHeader { get; set; }
        public string CookieContent { get; set; }
        public string PrefCookieHeader { get; set; }
        public string PrefCookieMessage { get; set; }
        public string PerfCookieHeader { get; set; }
        public string PerfCookieMessage { get; set; }
        public string PersonCookieHeader { get; set; }
        public string PersonCookieMessage { get; set; }
    }
}