using System.Collections.Generic;
using System.Linq;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class DocumentsWidgetViewModel : SidebarContainerWithDefaultImage
    {
        public DocumentsWidgetViewModel(TreeNode item) : base(item)
        {
            DefaultImage = ((DocumentSidebarComponent)item).DefaultImage;
            DocumentBlocks = ContentHelper.GetNodes(((DocumentSidebarComponent) item).DocumentItems.Split(';'))
                .Select(doc => new DocumentBlockViewModel((Document)doc) {DefaultImage = this.DefaultImage}).ToList();
        }

        public List<DocumentBlockViewModel> DocumentBlocks { get; set; }
    }
}