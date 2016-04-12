using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using System.Linq;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Shared;
using System.Web.Mvc;
using CMS.Mvc.ViewModels.Solution;

namespace CMS.Mvc.Controllers.Afton
{
    public class SolutionController : SidebarPageController
    {
        private readonly ISolutionBusinessUnitProvider _solutionBusinessUnitProvider;
        private readonly ISolutionProvider _solutionProvider;
        private readonly IProductProvider _productProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;
        private readonly ISolutionConstantsProvider _solutionConstantsProvider;

        public SolutionController()
        {
            _solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
            _solutionProvider = new SolutionProvider();
            _productProvider = new ProductProvider();
            _treeNodesProvider = new TreeNodesProvider();
            _solutionConstantsProvider = new SolutionConstantsProvider();
        }

        public SolutionController(ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
            ISolutionProvider solutionProvider,
            IProductProvider productProvider,
            ITreeNodesProvider treeNodesProvider,
            ISolutionConstantsProvider solutionConstantsProvider)
        {
            _solutionBusinessUnitProvider = solutionBusinessUnitProvider;
            _solutionProvider = solutionProvider;
            _productProvider = productProvider;
            _treeNodesProvider = treeNodesProvider;
            _solutionConstantsProvider = solutionConstantsProvider;
        }
        [PageVisitActivity]
        public ActionResult Index(string name, string parentName)
        {
            var solution = _solutionProvider.GetSolutionItems(parentName).First(f => f.NodeName == name);
            var solutionViewModel = MapData<Solution, SolutionViewModel>(solution);
            var featuredProductListGuids = UtilsHelper.ParseGuids(solution.FeaturedProductList).Take(4).ToList();
            solutionViewModel.Products = MapData<Product, ProductViewModel>(_productProvider.GetProductItems(featuredProductListGuids, solution.Site.DisplayName));
            solutionViewModel.ParentName = parentName;
            solutionViewModel.SideBar = new SidebarViewModel
            {
                Items = MapSidebar(_sidebarProvider.GetSideBarItems(UtilsHelper.ParseGuids(solution.SidebarItems)), solution)
            };
            solutionViewModel.BreadCrumb = new BreadCrumbViewModel
            {
                BreadcrumbLinkItems = _treeNodesProvider.GetBreadcrumb(solution.DocumentGUID)
            };
            solutionViewModel.Constants = MapData<SolutionConstants, SolutionConstantsViewModel>(_solutionConstantsProvider.GetSolutionConstants());
            return View("~/Views/Afton/Solution/Index.cshtml", solutionViewModel);
        }
    }
}
