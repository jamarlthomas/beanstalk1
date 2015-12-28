using System.Linq;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.ViewModels.Product;
using Infrastructure.Mapper;

namespace CMS.Mvc.Infrastructure
{
	public class UIMappingConfiguration : MappingConfiguration
	{
        public UIMappingConfiguration(IObjectMapper objectMapper) : base(objectMapper) { }

        protected override void Objects()
        {
            CreateMap<Product, ProductViewModel>();
            CreateMap<Product, DownloadWidgetViewModel>()
                .ForMember(s => s.Title, d => d.Title)
                .ForMember(s=>s.TileImage, d=>d.TileImage);
            
        }

        protected override void Collections()
        {
            
        }
    }
}