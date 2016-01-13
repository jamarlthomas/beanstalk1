using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace CMS.Mvc.Providers
{
	public class ResourceTileProvider : IResourceTileProvider
    {
		public List<TreeNode> GetTiles(string guids, string siteName)
		{
			return ContentHelper.GetDocsByGuids<TreeNode>(StringToGuidsConvertHelper.ParseGuids(guids), siteName);
		}
    }
}