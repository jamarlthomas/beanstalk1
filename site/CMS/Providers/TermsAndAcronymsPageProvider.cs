using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class TermsAndAcronymsPageProvider : ITermsAndAcronymsPageProvider
    {
        public TermsAndAcronymsPage GetTermsAndAcronymsPage()
        {
            return ContentHelper.GetDoc<TermsAndAcronymsPage>(TermsAndAcronymsPage.CLASS_NAME);
        }
    }
}