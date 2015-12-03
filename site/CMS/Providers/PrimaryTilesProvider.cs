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
        private readonly TreeProvider _treeProvider = new TreeProvider();
        public List<TreeNode> GetPrimaryTiles(List<Guid> guids, string siteName)
        {
            var result = new List<TreeNode>();
            foreach (var guid in guids)
            {
                var singleDocument = _treeProvider.SelectSingleDocument(TreePathUtils.GetDocumentIdByDocumentGUID(guid, siteName));
                result.Add(singleDocument);
            }
            return result;
        }
    }
}