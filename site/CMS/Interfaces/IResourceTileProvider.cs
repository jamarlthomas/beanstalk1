using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
	public interface IResourceTileProvider
    {
		List<TreeNode> GetTiles(string guids, string siteName);
    }
}
