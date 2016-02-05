using CMS.DocumentEngine.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.App_Start
{
	public static class MappingConfig
    {
        public static void RegisterMappings()
        {
			AutoMapper.Mapper.CreateMap<Document, TileViewModel>();
			AutoMapper.Mapper.CreateMap<CustomNews, TileViewModel>();
			AutoMapper.Mapper.CreateMap<Event, TileViewModel>();
			AutoMapper.Mapper.CreateMap<Solution, TileViewModel>();
        }
    }
}