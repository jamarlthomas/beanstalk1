using System.Linq;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Product;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Product;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class SolutionController : BaseController
    {
        private readonly ISolutionBusinessUnitProvider _solutionBusinessUnitProvider;
		private readonly ISolutionProvider _solutionProvider;
		private readonly IProductProvider _productProvider;

        public SolutionController()
        {
            _solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
            _solutionProvider = new SolutionProvider();
			_productProvider = new ProductProvider();
        }

		public SolutionController(ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
            ISolutionProvider solutionProvider,
			IProductProvider productProvider)
        {
            _solutionBusinessUnitProvider = solutionBusinessUnitProvider;
            _solutionProvider = solutionProvider;
			_productProvider = productProvider;
        }

        public ActionResult Index(string name, string parentName)
        {
			var solutions = _solutionProvider.GetSolutionItems(parentName);
			var solution = solutions.First(f => f.Title == name);
			var solutionViewModel = MapData<Solution, SolutionViewModel>(solution);
			solutionViewModel.SidebarSolutions = MapData<Solution, SolutionViewModel>(solutions);
			var featuredProductListGuids = StringToGuidsConvertHelper.ParseGuids(solution.FeaturedProductList).Take(4).ToList();
			solutionViewModel.Products = MapData<Product, ProductViewModel>(_productProvider.GetProductItems(featuredProductListGuids, solution.Site.DisplayName));
			solutionViewModel.ParentName = parentName;
			return View("~/Views/Afton/Solution/Index.cshtml", solutionViewModel);
        }
    }
}
