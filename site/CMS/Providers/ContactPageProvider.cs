using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;
using System.Linq;

namespace CMS.Mvc.Providers
{
    public class ContactPageProvider : IContactPageProvider
    {
        public ContactPage GetContactPage()
        {
            return ContentHelper.GetDocs<ContactPage>(ContactPage.CLASS_NAME).First();
        }
    }
}