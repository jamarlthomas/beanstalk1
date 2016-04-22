using System.Collections.Generic;
using System.Linq;
using System.Web.Configuration;
using System.Web.Mvc;
using System.Web.Routing;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Infrastructure.Models;
using System.Text;

namespace CMS.Mvc.Helpers
{
    public static class RouteHelper
    {
        public const string NULL_VALUE_PLACEHOLDER = "-1";

        public static string GetSelectionFilterUrl(SelectionFilterSearchRequest searchRequest, string name = null)
        {
            StringBuilder sb = new StringBuilder(GetRoute("SelectionFilterPage").Route);
            if (!string.IsNullOrEmpty(name))
            {
                sb.AppendFormat("/{0}", name);
            }
            sb.AppendFormat("#/regions/{0}", searchRequest.Regions ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("/documents/{0}", searchRequest.DocumentTypesIds ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("/SBU/{0}", searchRequest.SBUId ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("/solutions/{0}", searchRequest.SolutionsIds ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("/sort/{0}", searchRequest.SortOrder ?? "Newest");
            sb.AppendFormat("/page/{0}", searchRequest.PageNumber ?? 1);
            sb.AppendFormat("/search/{0}", searchRequest.Query ?? string.Empty);
            return sb.ToString();
        }

        public static string GetSelectionFilterViewAllUrl(string documentTypesIds)
        {
            return GetSelectionFilterUrl(new SelectionFilterSearchRequest { DocumentTypesIds = documentTypesIds });
        }

        public static string GetRateContentResultsLink(string nodeAlias)
        {
            return string.Format("RateContent/Results/{0}", nodeAlias); 
        }

        internal static AftonRoute GetRoute(string routeName)
        {
            return ContentHelper.GetDocChildrenByName<AftonRoute>(AftonRoute.CLASS_NAME, "Routes").FirstOrDefault(r => r.DocumentName.Equals(routeName));
        }

        public static void UpdateAftonRoute(RouteCollection routes, AftonRoute route)
        {
            Route registeredRoute = routes.OfType<Route>()
                .FirstOrDefault(r =>
                    r.DataTokens != null && r.DataTokens.ContainsKey("RouteName") &&
                    r.DataTokens["RouteName"].ToString() == route.DocumentName);
            if (registeredRoute != null)
            {
                UpdateRoute(registeredRoute, route);
            }
            else
            {
                MapRouteName(routes, route.DocumentName, route.Route, new { controller = route.Controller, action = route.Action });
                //MapRouteWithName(routes, route.DocumentName, route.Route, new { controller = route.Controller, action = route.Action });
            }
        }

        public static void UpdateRoute(Route registeredRoute, AftonRoute route)
        {
            registeredRoute.Url = route.Route;
            registeredRoute.Defaults["controller"] = route.Controller;
            registeredRoute.Defaults["action"] = route.Action;
        }

        public static void UpdateRoute(Route registeredRoute, string name, string url, object defaults)
        {
            registeredRoute.Url = url;
            var dictionary = defaults as IDictionary<string, object>;
            if (dictionary != null)
            {
                registeredRoute.Defaults["controller"] = dictionary["controller"];
                registeredRoute.Defaults["action"] = dictionary["action"];
            }
        }

        public static Route MapRouteWithName(RouteCollection routes, string name, string url, object defaults)
        {
            Route route;
            route = routes
                .OfType<Route>()
                .FirstOrDefault(item => item.DataTokens != null &&
                                        item.DataTokens["RouteName"] != null &&
                                        item.DataTokens["RouteName"].ToString() == name);
            if (route != null)
            {
                UpdateRoute(route, name, url, defaults);
            }
            else
            {
                route = MapRouteName(routes, name, url, defaults);
            }
            return route;
        }

        private static Route MapRouteName(RouteCollection routes, string name, string url, object defaults)
        {
            Route route;
            route = routes.MapRoute(name, url, defaults);
            route.DataTokens = new RouteValueDictionary();
            route.DataTokens.Add("RouteName", name);
            return route;
        }
    }
}