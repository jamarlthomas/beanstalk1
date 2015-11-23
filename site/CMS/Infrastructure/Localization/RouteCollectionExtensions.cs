using System.Web.Mvc;
using System.Web.Routing;

namespace CMS.Mvc.Infrastructure.Localization
{
    public static class RouteCollectionExtensions
    {
        public static TranslatedRoute MapTranslatedRoute(this RouteCollection routes, string routeName, string url,
            object defaults, RouteValueTranslationProvider routeValueTranslationProvider, bool setDetectedCulture)
        {
            TranslatedRoute route  = new TranslatedRoute(
                url,
                new RouteValueDictionary(defaults),
                routeValueTranslationProvider,
                setDetectedCulture,
                new MvcRouteHandler()
                );
            routes.Add(route);
            return route;
        }
        public static TranslatedRoute MapTranslatedRoute(this RouteCollection routes, string routeName, string url,
            object defaults, object translationProviders, bool setDetectedCulture)
        {
            TranslatedRoute route = new TranslatedRoute(
                url,
                new RouteValueDictionary(defaults),
                new RouteValueDictionary(translationProviders),
                setDetectedCulture,
                new MvcRouteHandler()
                );
            routes.Add(route);
            return route;
        }

    }
}
