using CMS.DocumentEngine;
using System;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ITilesProvider
    {
        List<TreeNode> GetTiles(List<Guid> guids);
    }
}
