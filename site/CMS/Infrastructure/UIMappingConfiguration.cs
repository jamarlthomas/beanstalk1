using System.Linq;
using System.Web;
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
            CreateMap<Product, ProductViewModel>()
                .ForMember(s=>new HtmlString(s.Content), d=>d.DefaultContent);
            CreateMap<Product, DownloadWidgetViewModel>();

        }

        protected override void Collections()
        {
            
        }
    }
}