using System.Web;
using CMS.DocumentEngine;
using CMS.Mvc.Helpers;
using System;
using System.Linq;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Helpers;
using CMS.Mvc.Providers;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class LeftSideBlockViewModel : SidebarItemViewModel
    {
        public LeftSideBlockViewModel(TreeNode item) : base(item)
        {
            //Reference = item.GetStringValue("Reference", "");
            if (item.NodeClassName == GenericSidebarBlock.CLASS_NAME)
            {
                var _treeNodesProvider = new TreeNodesProvider();
                var newGUID= UtilsHelper.ParseGuids(item.GetStringValue("SidebarItem", ""));
                var NodeReference = ContentHelper.GetDocByNodeId<TreeNode>(ContentHelper.GetNodeByNodeGuid(newGUID.Last()));
                if (NodeReference == null)
                {
                    NodeReference = ContentHelper.GetDocByGuid<TreeNode>(newGUID.Last());
                    Reference = ((NodeReference as IRoutedModel) != null) ? (NodeReference as IRoutedModel).DocumentRoutePath : NodeReference.DocumentNamePath;
                    Description = new HtmlString(NodeReference.GetStringValue("Description", ""));
                }
                else
                {
                    Reference = ((NodeReference as IRoutedModel) != null) ? (NodeReference as IRoutedModel).DocumentRoutePath : NodeReference.DocumentNamePath;
                    Description = new HtmlString(NodeReference.GetStringValue("Description", ""));
                }
                
            }
            else
            {
                Reference = ((item as IRoutedModel) != null) ? (item as IRoutedModel).DocumentRoutePath : item.DocumentNamePath;
                Description = new HtmlString(item.GetStringValue("Description", ""));
            }
            
            ImageUrl = item.GetStringValue("ImageUrl", "");
            
        }
        public string Reference { get; set; }
        public string ImageUrl { get; set; }
        public HtmlString Description { get; set; }
    }
}
