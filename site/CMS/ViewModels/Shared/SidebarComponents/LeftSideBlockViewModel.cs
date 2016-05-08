using System.Web;
using CMS.DocumentEngine;
using CMS.Mvc.Helpers;
using System;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;


namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class LeftSideBlockViewModel : SidebarItemViewModel
    {
        public LeftSideBlockViewModel(TreeNode item) : base(item)
        {
            //Reference = item.GetStringValue("Reference", "");
            if (item.NodeClassName == GenericSidebarBlock.CLASS_NAME)
            {
                var NodeReference = ContentHelper.GetDocByGuid<TreeNode>(Guid.Parse(item.GetStringValue("SidebarItem", "")));
                Reference = ((NodeReference as IRoutedModel) != null) ? (NodeReference as IRoutedModel).DocumentRoutePath : NodeReference.DocumentNamePath;
                Description = new HtmlString(NodeReference.GetStringValue("Description", ""));
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
