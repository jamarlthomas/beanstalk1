using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Interfaces
{
    public interface IContactPageProvider
    {
        ContactPage GetContactPage();
        List<BreadCrumbLinkItemViewModel> GetBreadcrumb(string name);
    }
}