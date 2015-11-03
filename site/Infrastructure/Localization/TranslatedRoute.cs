using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Infrastructure.Localization
{

    public class TranslatedRoute : Route
    {
        public bool SetDetectedCulture { get; set; }
        public RouteValueDictionary TranslationProviders { get; private set; }
        
        public TranslatedRoute(string url, RouteValueDictionary defaults, RouteValueDictionary translationProviders, bool setDetectedCulture, MvcRouteHandler handler): base(url, defaults, handler)
        {
            TranslationProviders = translationProviders;
            SetDetectedCulture = setDetectedCulture;
        }

        


        public override RouteData GetRouteData(HttpContextBase httpContext)
        {
            RouteData route = base.GetRouteData(httpContext);
            if (route == null) return null;

            foreach (KeyValuePair<string, object> value in route.Values)
            {
               // value.Value = ((IRouteValueTranslationProvider)TranslationProviders[value.Key]).TranslateFrom()
            }
            return route;

        }

        public override VirtualPathData GetVirtualPath(RequestContext requestContext, RouteValueDictionary values)
        {
            return base.GetVirtualPath(requestContext, values);
        }
    }
}
