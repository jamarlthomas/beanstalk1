using System;
using System.Web;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.Personalization;
using Infrastructure.Mapper;
using ProductViewModel = CMS.Mvc.ViewModels.Product.ProductViewModel;

namespace CMS.Mvc.Infrastructure
{
	public class UIMappingConfiguration : MappingConfiguration
	{
        public UIMappingConfiguration(IObjectMapper objectMapper) : base(objectMapper) { }

        protected override void Objects()
        {
            CreateMap<GenericPage, DocumentViewModel>();

            CreateMap<Product, ProductViewModel>()
                .ForMember(s=>new HtmlString(s.Content), d=>d.DefaultContent);
            CreateMap<Product, DownloadWidgetViewModel>();
            CreateMap<Product, RelatedProductCardViewModel>()
                .ForMember(s => s.Title, d => d.Header)
                .ForMember(s => s.HomeImage, d => d.ImageUrl)
                .ForMember(s => s.Description, d => d.Text)
                .ForMember(s=> s.DocumentNamePath, d=>d.Reference)
                .ForMember(s=>((SolutionBusinessUnit)s.Parent.Parent).Title, d=>d.Title)
                .ForMember(s=>((Solution)s.Parent).Title, d=>d.SubHeader);

            CreateMap<PersonalizedTile, PersonalizationCardViewModel>()
                .ForMember(s => s.HomeImage, d => d.HomeImage)
                .ForMember(s => s.Title, d => d.Title)
                .ForMember(s => (DateTime)s.Item.GetValue("DocumentModifiedWhen"), d => d.Date)
                .ForMember(s => s.Description, d => d.Description);
        }
        protected override void Collections()
        {
            CreateListMap<Product, RelatedProductCardViewModel>();
            CreateListMap<PersonalizedTile, PersonalizationCardViewModel>();
        }

    }


}
