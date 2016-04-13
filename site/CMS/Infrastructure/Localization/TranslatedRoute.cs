using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace CMS.Mvc.Infrastructure.Localization
{

    public class TranslatedRoute : Route
    {
        public bool SetDetectedCulture { get; set; }
        public RouteValueDictionary TranslationProviders { get; private set; }

        public TranslatedRoute(string url, RouteValueDictionary defaults, RouteValueTranslationProvider translationProvider, bool setDetectedCulture, MvcRouteHandler handler)
            : base(url, defaults, handler)
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
            if (route == null) return route;
            IRouteValueTranslationProvider prv;
            RouteData newRoute = new RouteData(route.Route, route.RouteHandler);
            
            //handle culture change from language selector
            var cultureToChange = GetCultureToChange(httpContext,
                ((IRouteValueTranslationProvider) TranslationProviders.FirstOrDefault().Value).RouteDictionarySet.Keys);
            if (cultureToChange != null)
            {
                //redirect browser to the same page but translated to specified culture
                RouteValueDictionary newValues = new RouteValueDictionary();
                CultureInfo oldCulture = null;
                foreach (KeyValuePair<string, object> value in route.Values)
                {
                    prv = (IRouteValueTranslationProvider) TranslationProviders[value.Key];
                    if (prv == null)
                    {
                        newValues.Add(value.Key, value.Value);
                        continue;
                    }
                    //translate from original culture to default
                    var defaultCultureValue = prv.TranslateFrom(oldCulture, value.Value.ToString());
                    oldCulture = oldCulture ?? defaultCultureValue.Culture;
                    //translate from default to a new culture specified in language selector
                    var translatedValue = prv.TranslateTo(cultureToChange, defaultCultureValue.DefaultCultureValue);
                    newValues.Add(value.Key, translatedValue.ForeignCultureValue);
                }
                
                httpContext.Response.Redirect(string.Format("/{0}/{1}/{2}", newValues["controller"], newValues["action"], newValues["name"]), true);
                return route;
            }
            
            CultureInfo operationCulture = GetCultureFromCookie(httpContext);
            //to ensure all values are translated from the same culture
            bool cultureSwitchAllowed = true;
            foreach (KeyValuePair<string, object> value in route.Values)
            {
                //tranlsate each value in route
                prv = (IRouteValueTranslationProvider) TranslationProviders[value.Key];

                //if culture has already been detected somehow earlier translate the value
                //if culture is not specified provider will try to match the language
                var translatedValue = prv.TranslateFrom(operationCulture, value.Value.ToString());
                newRoute.Values.Add(value.Key, translatedValue.DefaultCultureValue);
                // if no such translations in specified language change culture to the one that has tranlsation
                if (translatedValue.Culture != null && !translatedValue.Culture.Equals(operationCulture) &&
                    cultureSwitchAllowed)
                    operationCulture = translatedValue.Culture;

                cultureSwitchAllowed = false;
            }

            if (operationCulture != null && SetDetectedCulture)
            {
                SetCulture(httpContext, operationCulture);
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

        private CultureInfo GetCultureToChange(HttpContextBase context, IEnumerable<string> keyCollection)
        {
            //UI forces culture change
            if (context.Request.QueryString.AllKeys.Contains("lang"))
            {
                var qsCulture = context.Request.QueryString.Get("lang");
                if (qsCulture != null
                    &&
                    CultureInfo.GetCultures(CultureTypes.AllCultures)
                        .Any(c => c.Name.Equals(qsCulture, StringComparison.InvariantCultureIgnoreCase)))
                {
                    //specified culture exists
                    CultureInfo culture = new CultureInfo(qsCulture);
                    if (keyCollection.Contains(culture.Name, StringComparer.InvariantCultureIgnoreCase))
                    {
                        //save culture in current thread
                        SetCulture(context, culture);
                        return culture;
                    }
                }
            }
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
            //Thread.CurrentThread.CurrentCulture = culture;
            //Thread.CurrentThread.CurrentUICulture = culture;
            ////context.Response.Cookies.Add(new HttpCookie("CMSPreferredCulture", culture.Name));
            //context.Response.Cookies.Add(new HttpCookie("lang", culture.Name));
        }


    }
}
