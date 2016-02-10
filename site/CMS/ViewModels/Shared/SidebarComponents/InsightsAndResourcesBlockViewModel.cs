using System.Web;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class InsightsAndResourcesBlockViewModel : SidebarComponentWithDefaultImageViewModel
    {
        public InsightsAndResourcesBlockViewModel(Document item) : base(item)
        {
            Title = item.Title;
            Summary = new HtmlString(item.Abstract);
            ImageUrl = item.HomeImage;
        }
        
        protected override void Load()
        {
            //base.Load();
            //Title = ((Document)item).Title;
            //Summary = ((Document)item).Abstract;
        }
    }
}
