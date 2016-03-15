using System.Data;
using CMS.Mvc.ViewModels.Shared;
using System;
using System.Linq;
using System.Reflection;
using CMS.Mvc.Helpers;
using CMS.DocumentEngine;

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
            var cmsTypes = Assembly.GetExecutingAssembly().GetTypes()
                .Where(t => String.Equals(t.Namespace, "CMS.DocumentEngine.Types", StringComparison.Ordinal))
                .Select(type => AutoMapper.Mapper.CreateMap(type, typeof(TileViewModel))).ToList();
        }
    }
}