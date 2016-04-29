using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;
using System.Linq;

namespace CMS.Mvc.Providers
{
    public class MegaMenuSubLinkItemProvider : IMegaMenuSubLinkItemProvider
	{
        public List<MegaMenuSubLinkItem> GetMegaMenuSubLinkItems(string parentAlias)
        {
            return ContentHelper.GetDocChildrenByName<MegaMenuSubLinkItem>(MegaMenuSubLinkItem.CLASS_NAME, parentAlias);
        }
    }
}