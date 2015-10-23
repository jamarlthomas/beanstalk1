using System.Collections.Generic;
using EmitMapper.MappingConfiguration;

namespace Infrastructure.Mapper
{
    public interface IMappingConfiguration
    {
        IDictionary<string, DefaultMapConfig> Mappings { get; }
    }
}
