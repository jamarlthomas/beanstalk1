using System;
using System.Collections.Generic;
using System.Configuration;
using System.Dynamic;
using System.Web.Mvc;
using System.Web.Routing;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure;
using CMS.Mvc.Infrastructure.Localization;
using System.Reflection;
using System.Linq;
using AttributeRouting.Web.Mvc;

namespace CMS.Mvc
{
    /// <summary>
    /// Class providing manipulation with the application routes.
    /// </summary>
    public class RouteConfig
    {
        /// <summary>
        /// Registers the application routes.
        /// </summary>
        /// <param name="routes">The routes collection</param>
        public static void RegisterRoutes(RouteCollection routes)
        {

            SetUpRoutesFromKentico(routes);
            SetUpConstantRoutes(routes);
            routes.MapMvcAttributeRoutes();
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

        }

        private static void SetUpConstantRoutes(RouteCollection routes)
        {
            RouteHelper.MapRouteWithName(routes, "SidebarPage", "SidebarPage/{action}", new { controller = "SidebarPage", action = "Index" });
            RouteHelper.MapRouteWithName(routes, "SidebarPageEmail", "SidebarPage/SubmitEmail", new { controller = "SidebarPage", action = "SubmitEmail" });
            RouteHelper.MapRouteWithName(routes, "Master", "Master/{action}/{title}", new { controller = "Master", action = "Index", title = UrlParameter.Optional });
            RouteHelper.MapRouteWithName(routes, "RateContentWidget", "RateContent/{action}/{Request}", new { controller = "RateContent", action = "Widget", Request = UrlParameter.Optional });
            RouteHelper.MapRouteWithName(routes, "Personalization", "Personalization/GetPeronalizedCards", new { controller = "Personalization", action = "GetPeronalizedCards" });
            RouteHelper.MapRouteWithName(routes, "TermsAndAcryonyms", "TermsAndAcronyms/Data", new{ controller = "TermsAndAcronyms", action = "Data", Request = UrlParameter.Optional });
        }

        internal static void SetUpRoutesFromKentico(RouteCollection routes)
        {
            var kenticoRoutes = ContentHelper.GetDocChildrenByNameAllCultures<AftonRoute>(AftonRoute.CLASS_NAME, "Routes");
           
            kenticoRoutes.ForEach(kr => RouteHelper.UpdateAftonRoute(routes, kr));
            
        }
     
  

    }
}