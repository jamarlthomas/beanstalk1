using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class FAQPageProvider : IFAQPageProvider
    {
        public FAQPage GetFAQPage()
        {
            return ContentHelper.GetDoc<FAQPage>(FAQPage.CLASS_NAME);
        }
    }
}