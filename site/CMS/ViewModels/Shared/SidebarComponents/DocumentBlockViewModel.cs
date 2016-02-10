using System.Web;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class DocumentBlockViewModel: SidebarComponentWithDefaultImageViewModel
    {
        public DocumentBlockViewModel(Document item)
            : base(item)
        {
            Title = item.Title;
            Summary = new HtmlString(item.Abstract);
            ImageUrl = item.HomeImage;
        }
    }
}
