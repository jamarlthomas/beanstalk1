using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Linq;

namespace CMS.Mvc.Providers
{
    public class ATCToolsPageProvider : IATCToolsPageProvider
    {
        public ATCToolsPage GetATCToolsPage()
        {
            return ContentHelper.GetDoc<ATCToolsPage>(ATCToolsPage.CLASS_NAME);
        }
    }
}