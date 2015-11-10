using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class FooterNewsEventsProvider : IFooterNewsEventsProvider
    {
        public List<FooterNewsEvents> GetFooterNewsEventsItems()
        {
            return ContentHelper.GetDocs<FooterNewsEvents>(FooterNewsEvents.CLASS_NAME);
        }
    }
}