using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class ContactPageProvider : IContactPageProvider
    {
        public ContactPage GetContactPage()
        {
            return ContentHelper.GetDoc<ContactPage>(ContactPage.CLASS_NAME);
        }
    }
}