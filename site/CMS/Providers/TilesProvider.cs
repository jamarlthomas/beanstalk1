using CMS.DocumentEngine;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class TilesProvider : ITilesProvider
    {
        public List<TreeNode> GetTiles(List<Guid> guids)
        {
            return ContentHelper.GetDocsByGuids<TreeNode>(guids);
        }
    }
}