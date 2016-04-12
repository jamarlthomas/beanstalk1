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
        protected int NodeId;
        protected string Path;
        protected ContactInfo CurrentContact;
        protected string ObjectName;

        private void Initialize(ActionExecutedContext filterContext)
        {
            InitContextItems(filterContext);
            NodeId = GetNodeId();
            Path = GetPath();
            ObjectName = GetObjectName();
            CurrentContact = GetCurrentContact();
        }

        private string GetObjectName()
        {
            return (Items[ContentHelper.ObjectNameKey] != null)
               ? (string)Items[ContentHelper.ObjectNameKey]
               : string.Empty;
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
            if (NodeId != 0 || !string.IsNullOrWhiteSpace(Path))
            {

                var activity = new ActivityInfo()
                {
                    ActivityNodeID = NodeId,
                    ActivityType = activityType,
                    ActivityTitle = string.Format(activityTitleTemplate, NodeId),
                    ActivitySiteID = SiteContext.CurrentSiteID,
                    ActivityOriginalContactID = CurrentContact.ContactID,
                    ActivityActiveContactID = CurrentContact.ContactID,
                    ActivityURL = Path
                };
                ActivityInfoProvider.SetActivityInfo(activity);
            }
        }
        private void ClearContextItems()
        {
            Items.Remove(ContentHelper.NodeIdKey);
            Items.Remove(ContentHelper.NodeAliasPathKey);
            Items.Remove(ContentHelper.ObjectNameKey);
        }
    }
}