using System.Web;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class InsightsAndResourcesBlockViewModel : SidebarComponentWithDefaultImageViewModel
    {
        public InsightsAndResourcesBlockViewModel(Document item) : base(item)
        {
            Title = item.Title;
            ImageUrl = item.HomeImage;
        }
    }
}
