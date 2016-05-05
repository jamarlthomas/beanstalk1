using CMS.DataEngine;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using CMS.OnlineMarketing;
using CMS.Membership;
using CMS.WebAnalytics;
using CMS.Newsletters;
using System;
using System.Data;
using System.Linq;

namespace CMS.Mvc.Providers
{
    public class ContactProvider : IContactProvider
    {
        public ContactInfo GetCurrentContact()
        {
            return OnlineMarketingContext.GetCurrentContact();
        }

        public string GetContactNameByGuid(Guid guid)
        {
            var dataSet = ModuleCommands.OnlineMarketingGetContacts(string.Format("ContactGUID = '{0}'", guid), string.Empty, 1, "ContactFirstName, ContactLastName");
            var contact = dataSet.Tables[0].AsEnumerable().FirstOrDefault();
            return string.Format("{0} {1}", contact.Field<string>("ContactFirstName"), contact.Field<string>("ContactLastName"));
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
            contact.ContactNotes = string.Format("{0}; {1}", contact.ContactNotes, request.Note);
            contact.SetValue("ContactIsSubscribed", request.IsSubscribed == "on");
            contact.Update();
        }
        public bool Subscribe(string subscriber)
        {
            SubscriberInfo sb = null;
            sb = SubscriberInfoProvider.GetSubscriberInfo(subscriber,SiteProvider.SiteContext.CurrentSiteID);
            if (sb == null)
            {
                sb = new SubscriberInfo();
                sb.SubscriberEmail = subscriber.Trim();
                sb.SubscriberFirstName = string.Empty;
                sb.SubscriberLastName = string.Empty;
                SubscriberInfoProvider.SetSubscriberInfo(sb);
            }
            else
            {
                ModuleCommands.OnlineMarketingCreateRelation(sb.SubscriberID, MembershipType.NEWSLETTER_SUBSCRIBER, ModuleCommands.OnlineMarketingGetCurrentContactID());
            }
            return true;

        }
    }
}