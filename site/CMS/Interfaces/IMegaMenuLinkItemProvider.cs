using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IMegaMenuLinkItemProvider
    {
        MegaMenuLinkItem GetMegaMenuLinkItem(string parentAlias);
    }
}
