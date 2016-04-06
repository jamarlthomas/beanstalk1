using CMS.DocumentEngine;
using System;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ITreeNodesProvider
    {
        List<TreeNode> GetTreeNodes(List<Guid> guids);
        List<TreeNode> GetTreeNodes(string guids);
        TreeNode GetTreeNodeByNodeId(int id);
        List<BreadCrumbLinkItemViewModel> GetBreadcrumb(Guid guid);
    }
}
