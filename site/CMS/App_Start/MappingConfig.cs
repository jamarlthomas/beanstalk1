using CMS.Mvc.ViewModels.Shared;
using System;
using System.Linq;
using System.Reflection;

namespace CMS.Mvc.App_Start
{
    public static class MappingConfig
    {
        public static void RegisterMappings()
        {
            AnyCMSModelToTileViewModelMapping();
        }

        private static void AnyCMSModelToTileViewModelMapping()
        {
            var tileViewModelType = new TileViewModel().GetType();
            var cmsTypes = Assembly.GetExecutingAssembly().GetTypes()
                .Where(t => String.Equals(t.Namespace, "CMS.DocumentEngine.Types", StringComparison.Ordinal))
                .Select(type => AutoMapper.Mapper.CreateMap(type, tileViewModelType)).ToList();
        }
    }
}