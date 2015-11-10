using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Home;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class HomeController : BaseController
    {
        private readonly IHeroContentProvider _heroContentProvider;
        public HomeController()
        {
            _heroContentProvider = new HeroContentProvider();
        }

        public HomeController(IHeroContentProvider heroContentProvider)
        {
            _heroContentProvider = heroContentProvider;
        }

        // GET: Home
        public ActionResult Index()
        {
            var model = new HomeViewModel
            {
                HeroContentList = MapData<HeroContent, HeroContentViewModel>(_heroContentProvider.GetHeroContentItems())
            };
            return View("~/Views/Afton/Home/Index.cshtml", model);
        }
    }
}