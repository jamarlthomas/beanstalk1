using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Master;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class MasterController : BaseController
    {
        private readonly IContentMenuItemProvider _contentMenuItemProvider;
        private readonly IPagesMenuItemProvider _pagesMenuItemProvider;

        public MasterController(IContentMenuItemProvider contentMenuItemProvider, IPagesMenuItemProvider pagesMenuItemProvider)
        {
            _contentMenuItemProvider = contentMenuItemProvider;
            _pagesMenuItemProvider = pagesMenuItemProvider;
        }

        public MasterController()
        {
            _contentMenuItemProvider = new ContentMenuItemProvider();
            _pagesMenuItemProvider = new PagesMenuItemProvider();
        }

        [Route("Master")]
        public ActionResult Index()
        {
            var pagesMenuItems = MapData<PagesMenuItem, PagesMenuItemViewModel>(_pagesMenuItemProvider.GetPagesMenuItems());
            var contentMenuItems = MapData<ContentMenuItem, ContentMenuItemViewModel>(_contentMenuItemProvider.GetContentMenuItems());
            return View();
        }
    }
}