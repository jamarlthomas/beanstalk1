using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IMegaMenuLinkItemProvider
    {
        List<MegaMenuLinkItem> GetMegaMenuLinkItems(string parentAlias);
    }
}
