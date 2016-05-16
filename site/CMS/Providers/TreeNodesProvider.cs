using System.Globalization;
using CMS.Base;
using CMS.DocumentEngine;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Shared;
using System;
using System.Collections.Generic;
using System.Linq;

namespace CMS.Mvc.Providers
{
    public class TreeNodesProvider : ITreeNodesProvider
    {
        public List<TreeNode> GetTreeNodes(List<Guid> guids, int limit = Int32.MaxValue)
        {
            return ContentHelper.GetDocsByGuids<TreeNode>(guids.Take(limit));
        }

        public List<TreeNode> GetTreeNodes(string guids, int limit = Int32.MaxValue)
        {
            return GetTreeNodes(UtilsHelper.ParseGuids(guids), limit);
        }

        public TreeNode GetTreeNodeByNodeId(int id)
        {
            return ContentHelper.GetDocByNodeId<TreeNode>(id);
        }

        public TreeNode GetTreeNodeByNodeGuid(Guid guid)
        {
            return ContentHelper.GetDocByGuid<TreeNode>(guid);
        }

        public List<BreadCrumbLinkItemViewModel> GetBreadcrumb(Guid guid)
        {
            return ContentHelper.GetBreadcrumb<TreeNode>(guid);
        }

        public List<DownloadLanguageLinkItemViewModel> GetAvailableTranslations(TreeNode product)
        {
            return product.CultureVersions.Select(
                item => new DownloadLanguageLinkItemViewModel()
                {
                    LanguageId = item.DocumentCulture,
                    Reference = item.GetValue("PdfReference", ""),
                    Title =
                        (((new CultureInfo(item.DocumentCulture)).NativeName).IndexOf("(", StringComparison.Ordinal) > 0)
                            ? (new CultureInfo(item.DocumentCulture)).NativeName.Substring(0, ((new CultureInfo(item.DocumentCulture)).NativeName).IndexOf("(", StringComparison.Ordinal)).TrimEnd()
                            : (new CultureInfo(item.DocumentCulture)).NativeName.TrimEnd()
                }).ToList();
        }
        public TreeNode GetDocumentByNodeGUID(Guid guid)
        {
            
            return ContentHelper.GetNodeByGuid<TreeNode>(guid);
        }
    }
}