using System;
using System.Configuration;
using System.Web.Mvc;
using System.Web.Routing;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure;
using CMS.Mvc.Infrastructure.Localization;

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
  
            routes.MapMvcAttributeRoutes();

            //routes.MapRoute(
            //    "Default",
            //    "{controller}/{action}/{name}",
            //    new { controller = "Home", action = "Index", name = "" }
            //    );


            //if (ConfigurationManager.AppSettings["EnableUrlLocalization"].Equals("true",
            //    StringComparison.InvariantCultureIgnoreCase))
            //{

            //    //routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            //    //routes.Ignore("css/{folder}/{filename}");
            //    //routes.Ignore("css/{filename}");
            //    //routes.Ignore("assets-layout/js/{filename}");
            //    //routes.Ignore("images/{folder}/{filename}");
            //    //routes.Ignore("fonts/{folder}/{filename}");

            //    //routes.IgnoreRoute("cmsapi/{command}");
            //    //routes.IgnoreRoute("cms/{command}");

            //    var translProvider = RouteValueTranslationProvider.GetProvider();
            //    //Utility.LoadTranslations(translProvider);

            //    routes.MapTranslatedRoute(
            //        "TranslationRoute",
            //        "{controller}/{action}/{name}",
            //        new { controller = "Home", action = "Index", name = "" },
            //        translProvider,
            //        true
            //        );
            //}
        }
    }
}