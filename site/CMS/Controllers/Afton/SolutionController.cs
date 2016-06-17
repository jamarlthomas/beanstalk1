using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using CMS.Mvc.ViewModels.Solution;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class SolutionController : SidebarPageController
    {
        private readonly ISolutionProvider _solutionProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;
        private readonly ISolutionConstantsProvider _solutionConstantsProvider;

        public SolutionController()
        {
            _solutionProvider = new SolutionProvider();
            _treeNodesProvider = new TreeNodesProvider();
            _solutionConstantsProvider = new SolutionConstantsProvider();
        }

        public SolutionController(ISolutionProvider solutionProvider,
            IProductProvider productProvider,
            ITreeNodesProvider treeNodesProvider,
            ISolutionConstantsProvider solutionConstantsProvider)
        {
            _solutionProvider = solutionProvider;
            _treeNodesProvider = treeNodesProvider;
            _solutionConstantsProvider = solutionConstantsProvider;
        }

        [PageVisitActivity]
        public ActionResult Index(string SolutionName, string SBUName)
        {
            var solution = _solutionProvider.GetSolution(SolutionName, SBUName);

            var solutionViewModel = MapData<Solution, SolutionViewModel>(solution);

            solutionViewModel.Products = GetProductViewModels(solution);

            solutionViewModel.ParentName = SBUName;

            var sidebarItems = ContentHelper.GetDocByDocId<Solution>(solution.DocumentID).Fields.SidebarItems2.ToList();
            //if (sidebarItems.Count() == 0)
            //{
            //    sidebarItems = _sidebarProvider.GetSideBarItems(UtilsHelper.ParseGuids(solution.SidebarItems));
            //}
            solutionViewModel.SideBar = new SidebarViewModel
            {
                Items = MapSidebar(sidebarItems, solution)
            };
            solutionViewModel.BreadCrumb = new BreadCrumbViewModel
            {
                BreadcrumbLinkItems = _treeNodesProvider.GetBreadcrumb(solution.DocumentGUID)
            };
            solutionViewModel.Constants = MapData<SolutionConstants, SolutionConstantsViewModel>(_solutionConstantsProvider.GetSolutionConstants());
            solutionViewModel.NodeID = solution.NodeID;
            return View("~/Views/Afton/Solution/Index.cshtml", solutionViewModel);
        }

        [PageVisitActivity]
        public ActionResult SubSolution(string subSolution, string solutionName)
        {
            return Index(subSolution, solutionName);
        }

        private List<ProductViewModel> GetProductViewModels(Solution solution)
        {
            return MapData<Product, ProductViewModel>(_treeNodesProvider.GetTreeNodes(solution.FeaturedProductList, 4).Cast<Product>());
        }
    }
}
