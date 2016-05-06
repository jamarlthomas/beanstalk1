using System.Web;
using CMS.DocumentEngine;
using CMS.Mvc.Helpers;
using System;
using CMS.DocumentEngine.Types;


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
                Reference = NodeReference.DocumentNamePath;
                Description = new HtmlString(NodeReference.GetStringValue("Description", ""));
            }
            else
            {
                Reference = item.DocumentNamePath;
                Description = new HtmlString(item.GetStringValue("Description", ""));
            }
            
            ImageUrl = item.GetStringValue("ImageUrl", "");
            
        }
        public string Reference { get; set; }
        public string ImageUrl { get; set; }
        public HtmlString Description { get; set; }
    }
}
