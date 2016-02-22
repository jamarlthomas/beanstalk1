using System.Web;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class InsightsAndResourcesBlockViewModel : SidebarComponentWithDefaultImageViewModel
    {
        public InsightsAndResourcesBlockViewModel(DocumentEngine.Types.Document item) : base(item)
        {
            Title = item.Title;
            Summary = new HtmlString(item.Abstract);
            ImageUrl = item.HomeImage;
        }
    }
}
