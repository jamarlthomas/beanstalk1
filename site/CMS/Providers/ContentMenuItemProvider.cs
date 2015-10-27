using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class ContentMenuItemProvider : IContentMenuItemProvider
    {
        public List<ContentMenuItem> GetContentMenuItems()
        {
            return ContentHelper.GetDocs<ContentMenuItem>(ContentMenuItem.CLASS_NAME);
        }
    }
}