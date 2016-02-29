using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.Providers
{
    public class FAQPageProvider : IFAQPageProvider
    {
        public List<FAQPage> GetFAQPages()
        {
            return ContentHelper.GetDocs<FAQPage>(FAQPage.CLASS_NAME);
        }

        public List<BreadCrumbLinkItemViewModel> GetBreadcrumb(string name)
        {
            return ContentHelper.GetBreadcrumb<FAQPage>(FAQPage.CLASS_NAME, name);
        }
    }
}