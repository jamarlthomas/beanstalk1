using CMS.DocumentEngine.Types;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ITermsAndAcronymsPageProvider
    {
        IList<TermsAndAcronymsPage> GetTermsAndAcronymsPages();
        List<BreadCrumbLinkItemViewModel> GetBreadcrumb(string name);
    }
}
