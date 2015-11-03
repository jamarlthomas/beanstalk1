using System.Web.Mvc;
using System.Web.Routing;
namespace Infrastructure.Localization
{
    public static class RouteCollectionExtensions
    {
        public static TranslatedRoute MapTranslatedRoute(this RouteCollection routes, string routeName, string url,
            object defaults, object routeValueTranslationProviders, bool setDetectedCulture)
        {
            TranslatedRoute route  = new TranslatedRoute(
                url,
                new RouteValueDictionary(defaults),
                new RouteValueDictionary(routeValueTranslationProviders),
                setDetectedCulture,
                new MvcRouteHandler()
                );
            routes.Add(route);
            return route;
        }

    }
}
