﻿using System;
using System.Configuration;
using System.Web.Mvc;
using System.Web.Routing;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure;
using CMS.Mvc.Infrastructure.Localization;
using System.Reflection;
using System.Linq;

namespace CMS.Mvc
{
    /// <summary>
    /// Class providing manipulation with the application routes.
    /// </summary>
    public class RouteConfig
    {
        private const string CONTROLLER_POSTFIX = "Controller";
        /// <summary>
        /// Registers the application routes.
        /// </summary>
        /// <param name="routes">The routes collection</param>
        public static void RegisterRoutes(RouteCollection routes)
        {

            routes.MapMvcAttributeRoutes();
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                "Default",
                "",
                new { controller = "Home", action = "Index", name = "" }
                );

            var controllersTypes = Assembly.GetExecutingAssembly().GetTypes().Where(t => String.Equals(t.Namespace, "CMS.Mvc.Controllers.Afton", StringComparison.Ordinal))
                .Select(s => s.Name).ToList();
            foreach (var controllerType in controllersTypes)
            {
                if (controllerType.EndsWith(CONTROLLER_POSTFIX))
                {
                    var controllerName = controllerType.Substring(0, controllerType.Length - CONTROLLER_POSTFIX.Length);
                    routes.MapRoute(
                        controllerName,
                        controllerName + "/{action}/{name}",
                        new { controller = controllerName, action = "Index", name = "" }
                    );
                }
            }
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