using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Linq;

namespace CMS.Mvc.Providers
{
    public class GlobalSearchPageProvider : IGlobalSearchPageProvider
    {
        public GlobalSearchPage GetGlobalSearchPage()
        {
            return ContentHelper.GetDocs<GlobalSearchPage>(GlobalSearchPage.CLASS_NAME).FirstOrDefault();
        }
    }
}