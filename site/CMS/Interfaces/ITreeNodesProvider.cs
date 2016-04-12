using CMS.DocumentEngine;
using CMS.Mvc.ViewModels.Shared;
using System;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ITreeNodesProvider
    {
        List<TreeNode> GetTreeNodes(List<Guid> guids, int limit = Int32.MaxValue);
        List<TreeNode> GetTreeNodes(string guids, int limit = Int32.MaxValue);
        TreeNode GetTreeNodeByNodeId(int id);
        List<BreadCrumbLinkItemViewModel> GetBreadcrumb(Guid guid);
    }
}
