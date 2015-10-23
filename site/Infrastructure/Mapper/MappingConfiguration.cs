using System.Collections.Generic;
using System.Linq;
using EmitMapper.MappingConfiguration;

namespace Infrastructure.Mapper
{
    public abstract class MappingConfiguration : IMappingConfiguration
    {

        private readonly Dictionary<string, DefaultMapConfig> _mappings = new Dictionary<string, DefaultMapConfig>();
        protected readonly IObjectMapper ObjectMapper;
        public IDictionary<string, DefaultMapConfig> Mappings
        {
            get
            {
                return _mappings;
            }
        }
        public MappingConfiguration(IObjectMapper objectMapper)
        {
            ObjectMapper = objectMapper;
            Initialize();
        }
        public IEnumerable<TDestination> ConverterFunc<TSource, TDestination>(IEnumerable<TSource> state)
        {
            var result = state.Select(x => ObjectMapper.Map<TSource, TDestination>(x)).ToList();
            return result;
        }
        public IList<TDestination> ConverterFunc<TSource, TDestination>(IList<TSource> state)
        {
            var result = state.Select(x => ObjectMapper.Map<TSource, TDestination>(x)).ToList();
            return result;
        }
        private void Initialize()
        {
            Configuration();
        }
        protected ExpressionsMapConfig<TSource, TDestination> CreateMap<TSource, TDestination>()
        {
            var defaultMapConfig = new ExpressionsMapConfig<TSource, TDestination>();
            Mappings[GetMappingName<TSource, TDestination>()] = defaultMapConfig;
            return defaultMapConfig;
        }
        protected void CreateCollectionMap<TSource, TDestination>()
        {
            CreateMap<ICollection<TSource>, IEnumerable<TDestination>>()
                .ConvertUsing<ICollection<TSource>, IEnumerable<TDestination>>(ConverterFunc<TSource, TDestination>);
        }
        protected void CreateListMap<TSource, TDestination>()
        {
            CreateMap<IList<TSource>, IList<TDestination>>()
                .ConvertUsing<IList<TSource>, IList<TDestination>>(ConverterFunc<TSource, TDestination>);
        }
        protected void CreateEnumerableMap<TSource, TDestination>()
        {
            CreateMap<IEnumerable<TSource>, IEnumerable<TDestination>>()
                .ConvertUsing<IEnumerable<TSource>, IEnumerable<TDestination>>(ConverterFunc<TSource, TDestination>);
        }
        private static string GetMappingName<TSource, TDestiantion>()
        {
            return typeof(TSource).FullName + typeof(TDestiantion).FullName;
        }
        private void Configuration()
        {
            Collections();
            Objects();
        }

        protected abstract void Objects();

        protected abstract void Collections();
    }
}
