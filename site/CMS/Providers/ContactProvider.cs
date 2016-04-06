using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using CMS.OnlineMarketing;

namespace CMS.Mvc.Providers
{
    public class ContactProvider : IContactProvider
    {
        public ContactInfo GetCurrentContact()
        {
            return OnlineMarketingContext.GetCurrentContact();
        }

        public void UpdateCurrentContact(UpdateContactRequest request)
        {
            var contact = GetCurrentContact();
            contact.ContactFirstName = request.FirstName;
            contact.ContactLastName = request.LastName;
            contact.ContactCompanyName = request.CompanyName;
            contact.ContactEmail = request.Email;
            contact.ContactMobilePhone = request.Phone;
            contact.ContactCountryID = request.CountryId;
            contact.ContactNotes = string.Format("{0}; {1}, Subscribe {2}", contact.ContactNotes, request.Note, request.IsSubscribed ?? "off");
            contact.Update();
        }
    }
}