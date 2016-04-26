using CMS.Mvc.Infrastructure.Models;
using CMS.OnlineMarketing;
using System;

namespace CMS.Mvc.Interfaces
{
    public interface IContactProvider
    {
        ContactInfo GetCurrentContact();
        void UpdateCurrentContact(UpdateContactRequest request);
        string GetContactNameByGuid(Guid guid);
    }
}
