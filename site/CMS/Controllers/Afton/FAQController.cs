using System;
using System.Linq;
using System.Web.Mvc;
using CMS.DocumentEngine.Types;
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

        public ActionResult Index()
        {
            var faqItems = _faqItemProvider.GetFAQItems();
            var page = _faqPageProvider.GetFAQPages().First();
            var model = new FAQPageViewModel
            {
                Title = page.Title,
                MenuSelectedItem = page.Parent.NodeAlias, //TODO: merge with insights & resources
                SideBar = new SidebarViewModel()
                {
                    Items = MapSidebar(_sidebarProvider.GetSideBarItems(StringToGuidsConvertHelper.ParseGuids(page.SidebarItems)), page)
                },
                Topics = _faqTopicProvider.GetFaqTopics().Select(topic => new FAQTopicViewModel
                {
                    Name = topic.Name,
                    Items = MapData<FAQItem, FAQItemViewModel>(faqItems.Where(w => Guid.Parse(w.FAQTopic) == topic.DocumentGUID))
                }).ToList(),
                BreadCrumb = new BreadCrumbViewModel
                {
                    BreadcrumbLinkItems = _faqPageProvider.GetBreadcrumb(page.NodeAlias)
                }
            };
            return View("~/Views/Afton/FAQ/Index.cshtml", model);
        }
    }
}