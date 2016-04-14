using CMS.Mvc.Infrastructure.Models;

namespace CMS.Mvc.Interfaces
{
    public interface IEmailProvider
    {
        void NotifyContactChanged(UpdateContactRequest request, string recipient);
    }
}
