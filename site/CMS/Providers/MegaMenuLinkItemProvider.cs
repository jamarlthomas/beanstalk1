using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace CMS.Mvc.Providers
{
    public class MegaMenuLinkItemProvider : IMegaMenuLinkItemProvider
    {
        public MegaMenuLinkItem GetMegaMenuLinkItem(string parentAlias)
        {
            return ContentHelper.GetDocChildrenByName<MegaMenuLinkItem>(MegaMenuLinkItem.CLASS_NAME, parentAlias).FirstOrDefault();
        }
    }
}