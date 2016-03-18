using CMS.DocumentEngine;
using System;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ITreeNodesProvider
    {
        List<TreeNode> GetTreeNodes(List<Guid> guids);
        List<TreeNode> GetTreeNodes(string guids);
    }
}
