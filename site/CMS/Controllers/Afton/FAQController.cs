using System;
using System.Linq;
using System.Web.Mvc;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.FAQ;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using CMS.Mvc.Helpers;

namespace CMS.Mvc.Controllers.Afton
{
    public class FAQController : SidebarPageController
    {
        public readonly IFAQItemProvider _faqItemProvider = new FAQItemProvider();
        public readonly IFAQPageProvider _faqPageProvider = new FAQPageProvider();
        public readonly IFAQTopicProvider _faqTopicProvider = new FAQTopicProvider();
        public readonly IInsightsResourcesProvider _insightsResourcesProvider = new InsightsResourcesProvider();
        public readonly ITreeNodesProvider _treeNodesProvider = new TreeNodesProvider();
        [PageVisitActivity]
        public ActionResult Index()
        {
            var faqItems = _faqItemProvider.GetFAQItems();
            var page = _faqPageProvider.GetFAQPage();
            var model = new FAQPageViewModel
            {
                Title = page.Title,
                MenuSelectedItem = _insightsResourcesProvider.GetInsightsResourcesByName(page.Parent.NodeAlias).Title,
                SideBar = new SidebarViewModel()
                {
                    Items = MapSidebar(_sidebarProvider.GetSideBarItems(UtilsHelper.ParseGuids(page.SidebarItems)), page)
                },
                Topics = _faqTopicProvider.GetFaqTopics().Select(topic => new FAQTopicViewModel
                {
                    Name = topic.Name,
                    Items = MapData<FAQItem, FAQItemViewModel>(faqItems.Where(w => Guid.Parse(w.FAQTopic) == topic.DocumentGUID))
                }).ToList(),
                BreadCrumb = new BreadCrumbViewModel
                {
                    BreadcrumbLinkItems = _treeNodesProvider.GetBreadcrumb(page.DocumentGUID)
                }
            };
            return View("~/Views/Afton/FAQ/Index.cshtml", model);
        }
    }
}