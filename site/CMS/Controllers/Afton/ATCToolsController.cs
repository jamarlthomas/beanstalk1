using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.ATCTools;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class ATCToolsController: SidebarPageController
    {
        private readonly IATCToolsPageProvider _atcToolsPageProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;

        public ATCToolsController()
        {
            _atcToolsPageProvider = new ATCToolsPageProvider();
            _treeNodesProvider = new TreeNodesProvider();
        }

        public ATCToolsController(IATCToolsPageProvider atcToolsPageProvider,
            ITreeNodesProvider treeNodesProvider)
        {
            _atcToolsPageProvider = atcToolsPageProvider;
            _treeNodesProvider = treeNodesProvider;
        }

        public ActionResult Index()
        {
            var page = _atcToolsPageProvider.GetATCToolsPage();
            var viewModel = MapData<ATCToolsPage, ATCToolsPageViewModel>(page);
            viewModel.SideBar = new SidebarViewModel
            {
                Items = MapSidebar(_sidebarProvider.GetSideBarItems(UtilsHelper.ParseGuids(page.SidebarItems)), page)
            };
            viewModel.BreadCrumb = new BreadCrumbViewModel
            {
                BreadcrumbLinkItems = _treeNodesProvider.GetBreadcrumb(page.DocumentGUID)
            };
            viewModel.ParentTitle = (page.Parent as InsightsResources).Title;
            return View("~/Views/Afton/ATCTools/Index.cshtml", viewModel);
        }
    }
}