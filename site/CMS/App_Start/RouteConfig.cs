using System;
using System.Configuration;
using System.Web.Mvc;
using System.Web.Routing;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure;
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
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.Ignore("css/{folder}/{filename}");
            routes.Ignore("css/{filename}");
            routes.Ignore("assets-layout/js/{filename}");
            routes.Ignore("images/{folder}/{filename}");
            routes.Ignore("fonts/{folder}/{filename}");
            routes.Ignore("cmsapi/{command}");
            routes.Ignore("cms/{command}");

            if (ConfigurationManager.AppSettings["EnableUrlLocalization"].Equals("true",
                StringComparison.InvariantCultureIgnoreCase))
            {
                var translProvider = RouteValueTranslationProvider.GetProvider();
                //Utility.LoadTranslations(translProvider);

                routes.MapTranslatedRoute(
                    "TranslationRoute",
                    "{controller}/{action}/{name}",
                    new { controller = "Home", action = "Index", name = "" },
                    translProvider,
                    true
                    );
            }
        }
    }
}