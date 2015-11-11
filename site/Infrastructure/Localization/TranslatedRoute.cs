using System;
using System.Collections.Generic;
using System.Collections.Specialized;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Infrastructure.Localization
{

    public class TranslatedRoute : Route
    {
        public bool SetDetectedCulture { get; set; }
        public RouteValueDictionary TranslationProviders { get; private set; }
        
        public TranslatedRoute(string url, RouteValueDictionary defaults, RouteValueTranslationProvider translationProvider, bool setDetectedCulture, MvcRouteHandler handler): base(url, defaults, handler)
        {
            TranslationProviders = new RouteValueDictionary(new { controller = translationProvider, action = translationProvider, name = translationProvider });
            SetDetectedCulture = setDetectedCulture;
        }
        public TranslatedRoute(string url, RouteValueDictionary defaults, RouteValueDictionary translationProviders, bool setDetectedCulture, MvcRouteHandler handler)
            : base(url, defaults, handler)
        {
            TranslationProviders = translationProviders;
            SetDetectedCulture = setDetectedCulture;
        }
        


        public override RouteData GetRouteData(HttpContextBase httpContext)
        {
            RouteData route = base.GetRouteData(httpContext);
            if (route == null) return null;
            
            RouteData newRoute = new RouteData(route.Route, route.RouteHandler);
            CultureInfo newCulture = null;
            IRouteValueTranslationProvider prv;
            foreach (KeyValuePair<string, object> value in route.Values)
            {
                //tranlsate each value in route
                prv = (IRouteValueTranslationProvider) TranslationProviders[value.Key];

                // check if UI forces culture change
                newCulture = newCulture ?? GetNewCulture(httpContext, prv.RouteDictionarySet.Keys);
                
                //if UI changes culture or culture has already been detected somehow earlier translate the value
                //if culture is not specified provider will try to match the language
                var translatedValue = prv.TranslateFrom(newCulture, value.Value.ToString());
                newRoute.Values.Add(value.Key, translatedValue.DefaultCultureValue);
                
                //save the culture to use on next step
                newCulture = newCulture ?? translatedValue.Culture;
            }
            if (newCulture == null) newCulture = CultureInfo.CurrentCulture;
            if (SetDetectedCulture)
            {
                Thread.CurrentThread.CurrentCulture = newCulture;
                Thread.CurrentThread.CurrentUICulture = newCulture;
            }
            return newRoute;

        }
        public override VirtualPathData GetVirtualPath(RequestContext requestContext, RouteValueDictionary values)
        {
            CultureInfo culture = CultureInfo.CurrentCulture;  
            RouteValueDictionary newValues = new RouteValueDictionary();
            IRouteValueTranslationProvider prv;
            foreach (KeyValuePair<string, object> value in values)
            {
                prv = (IRouteValueTranslationProvider)TranslationProviders[value.Key];
                if (prv == null)
                {
                    newValues.Add(value.Key, value.Value);
                    continue;
                }
                var translatedValue = prv.TranslateTo(culture, value.Value.ToString());
                newValues.Add(value.Key, translatedValue.ForeignCultureValue);
            }
            return base.GetVirtualPath(requestContext, newValues);
        }

        private CultureInfo GetNewCulture(HttpContextBase context, IEnumerable<string> keyCollection)
        {
            CultureInfo culture = null;
            //UI forces culture change
            if (context.Request.QueryString.AllKeys.Contains("lang"))
            {
                var qsCulture = context.Request.QueryString.Get("lang");
                if (qsCulture != null
                    && CultureInfo.GetCultures(CultureTypes.AllCultures).Any(c => c.Name.Equals(qsCulture, StringComparison.InvariantCultureIgnoreCase)))
                {
                    //specified culture exists
                    culture = new CultureInfo(qsCulture);
                    if (keyCollection.Contains(qsCulture))
                    {
                        //save culture in current thread
                        SetCulture(context, culture);
                        
                    }
                }
                return culture;
            }


            /*
            var cookieCulture = GetCultureFromCookie(context);
            if (cookieCulture != null && keyCollection.Contains(cookieCulture.Name))
            {
                SetCulture(context, cookieCulture);
                return cookieCulture;
            }
             */ 
            return null;
        }

        private CultureInfo GetCultureFromCookie(HttpContextBase context)
        {
            var cookie = context.Request.Cookies["lang"];
            if (cookie != null && CultureInfo.GetCultures(CultureTypes.AllCultures)
                    .Any(c => c.Name.Equals(cookie.Value, StringComparison.InvariantCultureIgnoreCase)))
            {
                return new CultureInfo(cookie.Value);
            }
            return null;
        }

        private void SetCulture(HttpContextBase context, CultureInfo culture)
        {
            Thread.CurrentThread.CurrentCulture = culture;
            Thread.CurrentThread.CurrentUICulture = culture;

            //context.Response.Cookies.Add(new HttpCookie("lang", culture.Name));
        }

        
    }
}
