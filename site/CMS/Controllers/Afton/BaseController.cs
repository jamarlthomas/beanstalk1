using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using CMS.Mvc.Infrastructure;
using Infrastructure.Mapper;

namespace CMS.Mvc.Controllers.Afton
{
 
    public class BaseController : Controller
    {
        private IObjectMapper _objectMapper;

        protected BaseController()
        {
            _objectMapper = new ObjectMapper();
            _objectMapper.LoadMappings(new UIMappingConfiguration(_objectMapper));
        }

        protected TDestinationType MapData<TSourceType, TDestinationType>(TSourceType mapSource) where TDestinationType : class
        {
            return _objectMapper.Map<TSourceType, TDestinationType>(mapSource);
        }
        protected  List<TDestinationType> MapData<TSourceType, TDestinationType>(IEnumerable<TSourceType> mapSourceCollection) where TDestinationType : class
        {
            return mapSourceCollection.Select(item => _objectMapper.Map<TSourceType, TDestinationType>(item)).ToList();
        }
    }
}
