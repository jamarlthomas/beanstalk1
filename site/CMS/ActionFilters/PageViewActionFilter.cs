using System.Web.Mvc;
using CMS.Localization;
using CMS.Mvc.Helpers;
using CMS.OnlineMarketing;
using CMS.Personas;
using CMS.SiteProvider;
using CMS.WebAnalytics;

namespace CMS.Mvc.ActionFilters
{
    public class PageViewActionFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            base.OnActionExecuting(filterContext);

            var pers = (new PersonaService()).GetPersonaForContact(ContactInfoProvider.GetContacts().FirstObject);

        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            base.OnActionExecuted(filterContext);
            if (AnalyticsHelper.AnalyticsEnabled(SiteContext.CurrentSiteName))
            {
                int nodeId = (filterContext.HttpContext.Items[ContentHelper.NodeIdKey] != null) ? (int)filterContext.HttpContext.Items[ContentHelper.NodeIdKey] : default(int);
                if (nodeId != default(int))
                {
                    HitLogProvider.LogPageView(
                        SiteContext.CurrentSiteName,
                        LocalizationContext.CurrentCulture.CultureCode,
                        null,
                        nodeId);
         
                }
            }
        }
    }
}