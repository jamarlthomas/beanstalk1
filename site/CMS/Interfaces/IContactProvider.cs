using CMS.Mvc.Infrastructure.Models;
using CMS.OnlineMarketing;

namespace CMS.Mvc.Interfaces
{
    public interface IContactProvider
    {
        ContactInfo GetCurrentContact();
        void UpdateCurrentContact(UpdateContactRequest request);
    }
}
