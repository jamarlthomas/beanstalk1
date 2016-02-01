using System.Collections.Generic;
using System.Linq;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class InsightsAndResourcesWidgetViewModel : SidebarContainerWithDefaultImage
    {
        public InsightsAndResourcesWidgetViewModel(TreeNode item) : base(item)
        {
            DefaultImage = ((InsightsAndResourcesWidget)item).DefaultImage;
            InsightsAndResourcesBlocks =
                ContentHelper.GetDocsByGuids<TreeNode>(StringToGuidsConvertHelper.ParseGuids(((InsightsAndResourcesWidget)item).InsightsAndResourceItems))
                .Select(ir => new InsightsAndResourcesBlockViewModel((Document)ir) { DefaultImage = this.DefaultImage}).ToList();
        }

        public List<InsightsAndResourcesBlockViewModel> InsightsAndResourcesBlocks { get; set; }

        protected override void Load()
        {
            base.Load();
        }

        
    }
}
