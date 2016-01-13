using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class PrimaryTilesProvider : IPrimaryTilesProvider
    {
        public List<TreeNode> GetPrimaryTiles(List<Guid> guids, string siteName)
        {
			return ContentHelper.GetDocsByGuids<TreeNode>(guids, siteName);
        }
    }
}