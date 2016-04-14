using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ViewModels.NewsAndEvents;
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
            AutoMapper.Mapper.CreateMap<CustomNews, NewsAndEventViewModel>();
            AutoMapper.Mapper.CreateMap<Event, NewsAndEventViewModel>();
        }

        private static void AnyCMSModelToTileViewModelMapping()
        {
            var cmsTypes = Assembly.GetExecutingAssembly().GetTypes()
                .Where(t => String.Equals(t.Namespace, "CMS.DocumentEngine.Types", StringComparison.Ordinal))
                .Select(type => AutoMapper.Mapper.CreateMap(type, typeof (TileViewModel))
                    .ForMember("Reference", opts => opts.MapFrom(src => (src as TreeNode).DocumentNamePath))
                    .ForMember("Date",
                        opts =>
                            opts.MapFrom<DateTime>(src => (DateTime) (src as TreeNode).GetValue("DocumentCreatedWhen"))))
                .ToList();
            AutoMapper.Mapper.CreateMap<CustomNews, NewsAndEventViewModel>();
            AutoMapper.Mapper.CreateMap<Event, NewsAndEventViewModel>();
        }
    }
}