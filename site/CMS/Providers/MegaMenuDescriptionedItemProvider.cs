using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class MegaMenuDescriptionedItemProvider : IMegaMenuDescriptionedItemProvider
    {
        public List<MegaMenuDescriptionedItem> GetMegaMenuDescriptionedItems(string parentAlias)
        {
            return ContentHelper.GetDocChildrenByName<MegaMenuDescriptionedItem>(MegaMenuDescriptionedItem.CLASS_NAME, parentAlias);
        }
    }
}