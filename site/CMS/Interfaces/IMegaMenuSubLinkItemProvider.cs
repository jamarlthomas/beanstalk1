using System.Collections.Generic;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Interfaces
{
    public interface IMegaMenuSubLinkItemProvider
    {
        List<MegaMenuSubLinkItem> GetMegaMenuSubLinkItems(string parentAlias);
    }
}