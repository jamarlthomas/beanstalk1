using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using System;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IPrimaryTilesProvider
    {
        List<TreeNode> GetPrimaryTiles(List<Guid> guids, string siteName);
    }
}
