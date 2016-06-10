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
        public List<TreeNode> GetTiles(string guids)
        {
            var newguids = UtilsHelper.ParseGuids(guids);
            List<TreeNode> Tiles = new List<TreeNode>();
            foreach(var guid in newguids) {
                var NodeReference = ContentHelper.GetDocByNodeId<TreeNode>(ContentHelper.GetNodeByNodeGuid(guid));
                if (NodeReference != null)
                {
                    Tiles.Add(NodeReference);
                }
            }
            if (Tiles.Count > 0)
            {
                return Tiles;
            }
            return ContentHelper.GetDocsByGuids<TreeNode>(UtilsHelper.ParseGuids(guids));
        }
    }
}