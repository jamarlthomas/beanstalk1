using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class MegaMenuThumbnailedItemProvider : IMegaMenuThumbnailedItemProvider
    {
        public List<MegaMenuThumbnailedItem> GetMegaMenuThumbnailedItems(string parentAlias)
        {
            return ContentHelper.GetDocChildrenByName<MegaMenuThumbnailedItem>(MegaMenuThumbnailedItem.CLASS_NAME, parentAlias);
        }
    }
}