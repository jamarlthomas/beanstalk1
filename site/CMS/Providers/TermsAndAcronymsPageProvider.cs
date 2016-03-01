using System.Collections.Generic;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.Providers
{
    public class TermsAndAcronymsPageProvider : ITermsAndAcronymsPageProvider
    {
        public IList<TermsAndAcronymsPage> GetTermsAndAcronymsPages()
        {
            return ContentHelper.GetDocs<TermsAndAcronymsPage>(TermsAndAcronymsPage.CLASS_NAME);
        }

        public List<BreadCrumbLinkItemViewModel> GetBreadcrumb(string name)
        {
            return ContentHelper.GetBreadcrumb<TermsAndAcronymsPage>(TermsAndAcronymsPage.CLASS_NAME, name);
        }
    }
}