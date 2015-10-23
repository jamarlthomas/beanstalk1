using Infrastructure.Mapper;

namespace CMS.Mvc.Infrastructure
{
	public class UIMappingConfiguration : MappingConfiguration
	{
        public UIMappingConfiguration(IObjectMapper objectMapper) : base(objectMapper) { }

        protected override void Objects()
        {
            
        }

        protected override void Collections()
        {
            
        }
    }
}