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
    }
}