using CMS.EmailEngine;
using CMS.MacroEngine;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using System.Configuration;

namespace CMS.Mvc.Providers
{
    public class EmailProvider : IEmailProvider
    {
        public void NotifyContactChanged(UpdateContactRequest request, string recipient)
        {
            var templateName = ConfigurationManager.AppSettings["EmailTemplateCodeName"];
            var siteName = ConfigurationManager.AppSettings["SiteName"];

            var template = EmailTemplateProvider.GetEmailTemplate(templateName, siteName);
            var email = new EmailMessage
            {
                EmailFormat = EmailFormatEnum.Html,
                From = template.TemplateFrom,
                Recipients = recipient,
                Subject = template.TemplateSubject
            };

            var macroResolver = MacroResolver.GetInstance();
            macroResolver.SetNamedSourceData("FirstName", request.FirstName);
            macroResolver.SetNamedSourceData("LastName", request.LastName);
            macroResolver.SetNamedSourceData("CompanyName", request.CompanyName);
            macroResolver.SetNamedSourceData("Email", request.Email);
            macroResolver.SetNamedSourceData("Phone", request.Phone);
            macroResolver.SetNamedSourceData("CountryName", request.CountryName);
            macroResolver.SetNamedSourceData("Note", request.Note);
            macroResolver.SetNamedSourceData("IsSubscribed", !string.IsNullOrEmpty(request.IsSubscribed) ? request.IsSubscribed : "off");

            EmailSender.SendEmail(siteName, email, templateName, macroResolver, true);
        }
    }
}