namespace Infrastructure.Mapper
{
    public interface IObjectMapper
    {
        TDestination Map<TSource, TDestination>(TSource sourceInstance);

        void LoadMappings(params IMappingConfiguration[] mappingConfigurations);
    }
}