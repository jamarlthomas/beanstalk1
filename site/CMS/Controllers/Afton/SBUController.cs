using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Home;
using CMS.Mvc.ViewModels.SBU;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class SBUController : BaseController
    {
        private readonly ISolutionBusinessUnitProvider _solutionBusinessUnitProvider;
        private readonly IAnchorMenuItemProvider _anchorMenuItemProvider;
        public SBUController()
        {
            _anchorMenuItemProvider = new AnchorMenuItemProvider();
            _solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
        }

        public SBUController(ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
            IAnchorMenuItemProvider anchorMenuItemProvider)
        {
            _solutionBusinessUnitProvider = solutionBusinessUnitProvider;
            _anchorMenuItemProvider = anchorMenuItemProvider;
        }

        //[Route("SBU/{alias}")]
        public ActionResult Index(string alias)
        {
            var sbu = _solutionBusinessUnitProvider.GetSolutionBusinessUnit(alias);
            var model = MapData<SolutionBusinessUnit, SBUViewModel>(sbu);
            var separatedDescription = DivideHelper.SeparateText(sbu.Description);
            model.LeftDescription = separatedDescription[0];
            model.RightDescription = separatedDescription[1];
            model.AnchorMenu = MapData<AnchorMenuItem, AnchorMenuItemViewModel>(_anchorMenuItemProvider.GetAnchorMenuItems());
            return View("~/Views/Afton/SBU/Index.cshtml", model);
        }
    }
}
