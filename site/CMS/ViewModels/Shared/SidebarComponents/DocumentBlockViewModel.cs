using System.Web;
namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class DocumentBlockViewModel: SidebarComponentWithDefaultImageViewModel
    {
        public DocumentBlockViewModel(DocumentEngine.Types.Document item)
            : base(item)
        {
            Title = item.Title;
            
            ImageUrl = item.HomeImage;
        }
    }
}
