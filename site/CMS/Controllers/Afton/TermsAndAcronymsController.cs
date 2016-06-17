using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using CMS.Mvc.ViewModels.TermsAndAcronyms;
using System.Configuration;
using System.Linq;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class TermsAndAcronymsController : SidebarPageController
    {
        private readonly ITermsAndAcronymsPageProvider _termsAndAcronymsPageProvider;
        private readonly ITermProvider _termProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;

        public TermsAndAcronymsController()
        {
            _termsAndAcronymsPageProvider = new TermsAndAcronymsPageProvider();
            _termProvider = new TermProvider();
            _treeNodesProvider = new TreeNodesProvider();
        }

        public TermsAndAcronymsController(ITermsAndAcronymsPageProvider termsAndAcronymsPageProvider,
            ITermProvider termProvider,
            ITreeNodesProvider treeNodesProvider)
        {
            _termsAndAcronymsPageProvider = termsAndAcronymsPageProvider;
            _termProvider = termProvider;
            _treeNodesProvider = treeNodesProvider;
        }

        public JsonResult Data()
        {
            var model = new TermsListViewModel
            {
                itemsPerPage = int.Parse(ConfigurationManager.AppSettings["TermsAndAcronymsRecordOnPageCount"]),
                results = _termProvider.GetTerms(_termsAndAcronymsPageProvider.GetTermsAndAcronymsPage().NodeAlias).Select(MapTermToTermViewModel).ToList()
            };
            return Json(model, JsonRequestBehavior.AllowGet);
        }

        [PageVisitActivity]
        public ActionResult Index()
        {
            var page = _termsAndAcronymsPageProvider.GetTermsAndAcronymsPage();
            var model = MapData<TermsAndAcronymsPage, TermsAndAcronymsPageViewModel>(page);
            model.ParentTitle = (page.Parent as InsightsResources).Title;
            var sidebarItems  = ContentHelper.GetDocByDocId<TermsAndAcronymsPage>(page.DocumentID).Fields.SidebarItems2.ToList();
            //if (sidebarItems.Count() == 0)
            //{
            //    sidebarItems = _sidebarProvider.GetSideBarItems(UtilsHelper.ParseGuids(page.SidebarItems));
            //}
            model.BreadCrumb = new BreadCrumbViewModel
            {
                BreadcrumbLinkItems = _treeNodesProvider.GetBreadcrumb(page.DocumentGUID)
            };
            model.SideBar = new SidebarViewModel
            {
                Items = MapSidebar(sidebarItems, page)
            };

            return View("~/Views/Afton/TermsAndAcronyms/Index.cshtml", model);
        }

        private TermViewModel MapTermToTermViewModel(Term term)
        {
            return new TermViewModel
            {
                name = term.TermAcronym,
                description = term.Definition
            };
        }
    }
}
