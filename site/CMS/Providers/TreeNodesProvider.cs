using CMS.DocumentEngine;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.ViewModels.Shared;
using System;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class TreeNodesProvider : ITreeNodesProvider
    {
        public List<TreeNode> GetTreeNodes(List<Guid> guids)
        {
            return ContentHelper.GetDocsByGuids<TreeNode>(guids);
        }

        public List<TreeNode> GetTreeNodes(string guids)
        {
            return GetTreeNodes(UtilsHelper.ParseGuids(guids));
        }

        public List<BreadCrumbLinkItemViewModel> GetBreadcrumb(Guid guid)
        {
            return ContentHelper.GetBreadcrumb<TreeNode>(guid);
        }
    }
}