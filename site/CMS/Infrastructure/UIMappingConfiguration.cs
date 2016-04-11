using System.Web;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ViewModels.Product;
using Infrastructure.Mapper;

namespace CMS.Mvc.Infrastructure
{
	public class UIMappingConfiguration : MappingConfiguration
	{
        public UIMappingConfiguration(IObjectMapper objectMapper) : base(objectMapper) { }

        protected override void Objects()
        {
            CreateMap<Product, ProductViewModel>()
                .ForMember(s=>new HtmlString(s.Content), d=>d.DefaultContent);
            CreateMap<Product, DownloadWidgetViewModel>();
            CreateMap<Product, RelatedProductCardViewModel>()
                .ForMember(s => s.Title, d => d.Header)
                //.ForMember(s => s.TileImage, d => d.ImageUrl)
                .ForMember(s => s.Description, d => d.Text)
                .ForMember(s=> s.DocumentNamePath, d=>d.Reference)
                .ForMember(s=>((SolutionBusinessUnit)s.Parent.Parent).Title, d=>d.Title)
                .ForMember(s=>((Solution)s.Parent).Title, d=>d.SubHeader);
            }
        protected override void Collections()
        {
            CreateListMap<Product, RelatedProductCardViewModel>();
            
        }

    }


}
