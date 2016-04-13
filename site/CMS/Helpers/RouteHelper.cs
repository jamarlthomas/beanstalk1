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
            StringBuilder sb = new StringBuilder("/SelectionFilter/Index");
            if (!string.IsNullOrEmpty(name))
            {
                sb.AppendFormat("/{0}", name);
            }
            sb.AppendFormat("?Regions={0}", searchRequest.Regions ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("&DocumentTypesIds={0}", searchRequest.DocumentTypesIds ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("&SBUId={0}", searchRequest.SBUId ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("&SolutionsIds={0}", searchRequest.SolutionsIds ?? NULL_VALUE_PLACEHOLDER);
            sb.AppendFormat("&SortOrder={0}", searchRequest.SortOrder ?? string.Empty);
            sb.AppendFormat("&Query={0}", searchRequest.Query ?? string.Empty);
            if (searchRequest.PageNumber.HasValue)
            {
                sb.AppendFormat("&PageNumber={0}", searchRequest.PageNumber);
            }
            return sb.ToString();
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