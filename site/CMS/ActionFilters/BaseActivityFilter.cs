using System.Collections;
using System.Web.Mvc;
using CMS.Mvc.Helpers;
using CMS.OnlineMarketing;
using CMS.SiteProvider;

namespace CMS.Mvc.ActionFilters
{
    public abstract class BaseActivityFilter : ActionFilterAttribute
    {
        public override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            InitContextItems(filterContext);
            ClearContextItems();
            base.OnActionExecuting(filterContext);
        }
        public override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            Initialize(filterContext);
            AddActivity(ActivityType, ActivityTitleTemplate);
            base.OnActionExecuted(filterContext);
        }

        protected abstract string ActivityType { get; }
        protected abstract string ActivityTitleTemplate { get; }

        private IDictionary Items { get; set; }
        private int _nodeId;
        private string _path;
        private ContactInfo _currentContact;

        private void Initialize(ActionExecutedContext filterContext)
        {
            InitContextItems(filterContext);
            _nodeId = GetNodeId();
            _path = GetPath();
            _currentContact = GetCurrentContact();
        }
        private ContactInfo GetCurrentContact()
        {
            return OnlineMarketingContext.GetCurrentContact();
        }
        private void InitContextItems(ControllerContext filterContext)
        {
            Items = filterContext.HttpContext.Items;
        }
        private int GetNodeId()
        {
            return (Items[ContentHelper.NodeIdKey] != null) ? (int)Items[ContentHelper.NodeIdKey] : default(int);
        }
        private string GetPath()
        {
            return (Items[ContentHelper.NodeAliasPathKey] != null)
                ? (string)Items[ContentHelper.NodeAliasPathKey]
                : string.Empty;
        }
        private void AddActivity(string activityType, string activityTitleTemplate)
        {
            if (_nodeId != 0 || !string.IsNullOrWhiteSpace(_path))
            {

                var activity = new ActivityInfo()
                {
                    ActivityType = activityType,
                    ActivityTitle = string.Format(activityTitleTemplate, _nodeId),
                    ActivitySiteID = SiteContext.CurrentSiteID,
                    ActivityOriginalContactID = _currentContact.ContactID,
                    ActivityActiveContactID = _currentContact.ContactID,
                    ActivityURL = _path
                };
                ActivityInfoProvider.SetActivityInfo(activity);
            }
        }
        private void ClearContextItems()
        {
            Items.Remove(ContentHelper.NodeIdKey);
            Items.Remove(ContentHelper.NodeAliasPathKey);
        }
    }
}