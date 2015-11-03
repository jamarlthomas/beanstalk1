using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using CMS.Mvc.Helpers;
using Infrastructure.Localization;

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
            /*
            RouteValueTranslationProvider firstLevelTranslator = new RouteValueTranslationProvider(
                new List<TranslationItem>()
                {
                    new TranslationItem(CultureInfo.GetCultureInfo("nl-NL"), "Home", "Thuis"),
                    new TranslationItem(CultureInfo.GetCultureInfo("es-ES"), "Home", "Domicilio")
                }
                );

            routes.MapTranslatedRoute(
                "TranslationRoute",
                "{controller}/{action}/{name}",
                new {controller = "Home", action = "Index", name = ""},
                new {controller = firstLevelTranslator, action = firstLevelTranslator, name = firstLevelTranslator},
                true
                );
            */
            //routes.MapMvcAttributeRoutes();
            routes.MapRoute(name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new {controller = "Home", action = "Index", id = UrlParameter.Optional});

            /*
             * Add your custom routes registration here
             */
        }
    }
}