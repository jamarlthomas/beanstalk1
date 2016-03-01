using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.NewsAndEvents;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using CMS.Mvc.ViewModels.TermsAndAcronyms;
using System.Linq;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class TermsAndAcronymsController : SidebarPageController
    {
        private readonly ITermsAndAcronymsPageProvider _termsAndAcronymsPageProvider;
        private readonly ITermProvider _termProvider;

        public TermsAndAcronymsController()
        {
            _termsAndAcronymsPageProvider = new TermsAndAcronymsPageProvider();
            _termProvider = new TermProvider();
        }

        public TermsAndAcronymsController(ITermsAndAcronymsPageProvider termsAndAcronymsPageProvider,
            ITermProvider termProvider)
        {
            _termsAndAcronymsPageProvider = termsAndAcronymsPageProvider;
            _termProvider = termProvider;
        }

        public ActionResult Index()
        {
            var page = _termsAndAcronymsPageProvider.GetTermsAndAcronymsPages().First();
            var model = MapData<TermsAndAcronymsPage, TermsAndAcronymsPageViewModel>(page);
            model.ParentTitle = (page.Parent as InsightsResources).Title;
            model.BreadCrumb = new BreadCrumbViewModel
            {
                BreadcrumbLinkItems = _termsAndAcronymsPageProvider.GetBreadcrumb(page.NodeAlias)
            };
            model.SideBar = new SidebarViewModel
            {
                Items = MapSidebar(_sidebarProvider.GetSideBarItems(StringToGuidsConvertHelper.ParseGuids(page.SidebarItems)), page)
            };
            model.Terms = MapData<Term, TermViewModel>(_termProvider.GetTerms(page.NodeAlias));

            return View("~/Views/Afton/TermsAndAcronyms/Index.cshtml", model);
        }
    }
}
