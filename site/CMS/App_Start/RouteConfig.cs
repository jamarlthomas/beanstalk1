using System;
using System.Configuration;
using System.Web.Mvc;
using System.Web.Routing;
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
            routes.Ignore("css/{folder}/{filename}");
            routes.Ignore("css/{filename}");
            routes.Ignore("Scripts/{filename}");
            routes.Ignore("Scripts/{folder}/{filename}");
            routes.Ignore("assets-layout/js/{filename}");
            routes.Ignore("images/{folder}/{filename}");
            routes.Ignore("fonts/{folder}/{filename}");
            routes.MapMvcAttributeRoutes();
            if (ConfigurationManager.AppSettings["EnableUrlLocalization"].Equals("true",
                StringComparison.InvariantCultureIgnoreCase))
            {
                var translProvider = RouteValueTranslationProvider.GetProvider();
                routes.MapTranslatedRoute(
                    "TranslationRoute",
                    "{controller}/{action}/{name}",
                    new {controller = "Home", action = "Index", name = ""},
                    translProvider,
                    true
                    );

                //routes.MapTranslatedRoute(
                //    "TranslationRoute",
                //    "{controller}/{action}/{name}",
                //    new { controller = "Home", action = "Index", name = "" },
                //    new { controller = translProvider, action = translProvider, name = translProvider }, //if different providers will be used for different route values
                //    true
                //    );

            }
            routes.MapRoute(name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional });

            /*
             * Add your custom routes registration here
             */
        }
    }
}