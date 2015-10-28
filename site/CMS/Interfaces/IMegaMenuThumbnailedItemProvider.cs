using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IMegaMenuThumbnailedItemProvider
    {
        List<MegaMenuThumbnailedItem> GetMegaMenuThumbnailedItems(string parentAlias);
    }
}
