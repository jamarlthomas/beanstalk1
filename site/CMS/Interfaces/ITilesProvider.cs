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
        List<BreadCrumbLinkItemViewModel> GetBreadcrumb(Guid guid);
    }
}
