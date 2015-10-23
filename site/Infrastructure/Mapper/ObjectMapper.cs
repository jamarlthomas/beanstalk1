using System.Collections.Generic;
using EmitMapper;
using EmitMapper.MappingConfiguration;

namespace Infrastructure.Mapper
{
    public class ObjectMapper : IObjectMapper
    {
        private readonly IDictionary<string, DefaultMapConfig> _mappings = new Dictionary<string, DefaultMapConfig>();

        public TDestination Map<TSource, TDestination>(TSource sourceInstance)
        {
            DefaultMapConfig defaultMapConfig = GetMapping<TSource, TDestination>();

            if (defaultMapConfig != null)
            {
                var mapper = ObjectMapperManager.DefaultInstance.GetMapper<TSource, TDestination>(defaultMapConfig);
                return mapper.Map(sourceInstance);
            }

            return ObjectMapperManager.DefaultInstance.GetMapper<TSource, TDestination>().Map(sourceInstance);
        }

        public void LoadMappings(params IMappingConfiguration[] mappingConfigurations)
        {
            foreach (var mconfig in mappingConfigurations)
            {
                foreach (var m in mconfig.Mappings)
                {
                    _mappings[m.Key] = m.Value;
                }
            }
        }

        private DefaultMapConfig GetMapping<TSource, TDestination>()
        {
            string typeName = GetMappingName<TSource, TDestination>();

            if (_mappings.ContainsKey(typeName))
            {
                return _mappings[typeName];
            }

            return null;
        }

        private static string GetMappingName<TFrom, TTo>()
        {
            return typeof(TFrom).FullName + typeof(TTo).FullName;
        }
    }
}
