using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.Providers
{
    public class PagesMenuItemProvider : IPagesMenuItemProvider
    {
        public List<PagesMenuItem> GetPagesMenuItems()
        {
            return ContentHelper.GetDocs<PagesMenuItem>(PagesMenuItem.CLASS_NAME);
        }
    }
}