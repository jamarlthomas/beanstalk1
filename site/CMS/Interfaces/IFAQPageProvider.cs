using System.Collections.Generic;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.Interfaces
{
    public interface IFAQPageProvider
    {
        List<FAQPage> GetFAQPages();
    }
}