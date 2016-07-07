using System.Web.Mvc;
using CMS.Localization;
using CMS.SiteProvider;
using CMS.WebAnalytics;

namespace CMS.Mvc.ActionFilters
{
    public class PageVisitActivity : BaseActivityFilter
    {
        protected override string ActivityType
        {
            get { return PredefinedActivityType.PAGE_VISIT; }
        }
        protected override string ActivityTitleTemplate
        {
            get { return "Document {0} was viewed"; }
        }

        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            base.OnActionExecuted(filterContext);
            AddActionToAnalytics();
        }
        protected void AddActionToAnalytics()
        {
            if (AnalyticsHelper.AnalyticsEnabled(SiteContext.CurrentSiteName))
            {
                if (NodeId != 0)
                {
                    HitLogProvider.LogPageView(SiteContext.CurrentSiteName, LocalizationContext.CurrentCulture.CultureCode, ObjectName, NodeId);
                }
            }
        }
    }
}