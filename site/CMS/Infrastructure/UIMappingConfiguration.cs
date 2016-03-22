using System.Web;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Shared;
using Infrastructure.Mapper;
using ProductViewModel = CMS.Mvc.ViewModels.Product.ProductViewModel;

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
                .ForMember(s => s.TileImage, d => d.ImageUrl)
                .ForMember(s => s.Description, d => d.Text)
                .ForMember(s=> RelatedProductCardViewModel.GetUrl(s), d=>d.Reference)
                .ForMember(s=>((SolutionBusinessUnit)s.Parent.Parent).Title, d=>d.Title)
                .ForMember(s=>((Solution)s.Parent).Title, d=>d.SubHeader);
            CreateMap<Document, InsightsAndResourcesCard>()
                //.ForMember(s=>, d=>d.Reference)
                .ForMember(s => s.HomeImage, d => d.ImageUrl)
                .ForMember(s => s.Title, d => d.Title)
                .ForMember(s => new HtmlString(s.Abstract), d => d.Header)
                .ForMember(s => s.DocumentPublishFrom, d => d.Date)
                .ForMember(s => new HtmlString(s.Description), d => d.Summary);
        }
        protected override void Collections()
        {
            CreateListMap<Product, RelatedProductCardViewModel>();
            
        }

    }


}
