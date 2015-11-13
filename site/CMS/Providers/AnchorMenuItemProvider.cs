using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class AnchorMenuItemProvider : IAnchorMenuItemProvider
    {
        public List<AnchorMenuItem> GetAnchorMenuItems()
        {
            return ContentHelper.GetDocs<AnchorMenuItem>(AnchorMenuItem.CLASS_NAME);
        }
    }
}