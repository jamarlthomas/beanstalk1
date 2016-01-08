using System.Linq;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.ViewModels.Shared;
using Infrastructure.Mapper;

namespace CMS.Mvc.Infrastructure
{
	public class UIMappingConfiguration : MappingConfiguration
	{
        public UIMappingConfiguration(IObjectMapper objectMapper) : base(objectMapper) { }

        protected override void Objects()
        {
            /*CreateMap<Product, ProductViewModel>()
                .ForMember(s => s.Description, d => d.DescriptionFirst);*/
        }

        protected override void Collections()
        {
            
        }
    }
}