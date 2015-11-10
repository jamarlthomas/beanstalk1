using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Master;
using System.Web.Mvc;
using System.Linq;

namespace CMS.Mvc.Controllers.Afton
{
    public class MasterController : BaseController
    {
        private readonly IContentMenuItemProvider _contentMenuItemProvider;
        private readonly IPagesMenuItemProvider _pagesMenuItemProvider;
        private readonly IMegaMenuThumbnailedItemProvider _megaMenuThumbnailedItemProvider;
        private readonly IMegaMenuLinkItemProvider _megaMenuLinkItemProvider;
        private readonly ISolutionBusinessUnitProvider _solutionBusinessUnitProvider;
        private readonly IFooterAboutProvider _footerAboutProvider;
        private readonly IFooterNewsEventsProvider _footerNewsEventsProvider;
        private readonly IFooterCareersProvider _footerCareersProvider;

        public MasterController(IContentMenuItemProvider contentMenuItemProvider,
            IPagesMenuItemProvider pagesMenuItemProvider,
            IMegaMenuThumbnailedItemProvider megaMenuThumbnailedItemProvider,
            IMegaMenuLinkItemProvider megaMenuLinkItemProvider,
            ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
            IFooterAboutProvider footerAboutProvider,
            IFooterNewsEventsProvider footerNewsEventsProvider,
            IFooterCareersProvider footerCareersProvider)
        {
            _contentMenuItemProvider = contentMenuItemProvider;
            _pagesMenuItemProvider = pagesMenuItemProvider;
            _megaMenuThumbnailedItemProvider = megaMenuThumbnailedItemProvider;
            _megaMenuLinkItemProvider = megaMenuLinkItemProvider;
            _solutionBusinessUnitProvider = solutionBusinessUnitProvider;
            _footerAboutProvider = footerAboutProvider;
            _footerNewsEventsProvider = footerNewsEventsProvider;
            _footerCareersProvider = footerCareersProvider;

        }

        public MasterController()
        {
            _contentMenuItemProvider = new ContentMenuItemProvider();
            _pagesMenuItemProvider = new PagesMenuItemProvider();
            _megaMenuThumbnailedItemProvider = new MegaMenuThumbnailedItemProvider();
            _megaMenuLinkItemProvider = new MegaMenuLinkItemProvider();
            _solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
            _footerAboutProvider = new FooterAboutProvider();
            _footerNewsEventsProvider = new FooterNewsEventsProvider();
            _footerCareersProvider = new FooterCareersProvider();
        }

        [ChildActionOnly]
        public ActionResult Index()
        {
            var mainNavList = MapData<ContentMenuItem, ContentMenuItemViewModel>(_contentMenuItemProvider.GetContentMenuItems());
            foreach (var contentMenuItem in mainNavList)
            {
                contentMenuItem.ThumbnailedMenuItems = MapData<MegaMenuThumbnailedItem, MegaMenuThumbnailedItemViewModel>(_megaMenuThumbnailedItemProvider.GetMegaMenuThumbnailedItems(contentMenuItem.Title));
                var solutionLink = _megaMenuLinkItemProvider.GetMegaMenuLinkItems(contentMenuItem.Title).FirstOrDefault();
                if (solutionLink != null)
                {
                    contentMenuItem.SolutionsLink = MapData<MegaMenuLinkItem, MegaMenuLinkItemViewModel>(solutionLink);
                    contentMenuItem.SolutionsLink.Solutions = MapData<SolutionBusinessUnit, MegaMenuSolutionBusinessUnitViewModel>(_solutionBusinessUnitProvider.GetSolutionBusinessUnits(contentMenuItem.Title));
                }
            }
            return PartialView("~/Views/Afton/Master/_master.cshtml", new MasterViewModel
            {
                MainNavList = mainNavList,
                UtilityNavList = MapData<PagesMenuItem, PagesMenuItemViewModel>(_pagesMenuItemProvider.GetPagesMenuItems()),
                Footer = new FooterViewModel
                {
                    FooterAboutItems = MapData<FooterAbout, FooterAboutViewModel>(_footerAboutProvider.GetFooterAbouItems()),
                    FooterCareersItems = MapData<FooterCareers, FooterCareersViewModel>(_footerCareersProvider.GetFooterCareersItems()),
                    FooterNewsEventsItems = MapData<FooterNewsEvents, FooterNewsEventsViewModel>(_footerNewsEventsProvider.GetFooterNewsEventsItems())
                }
            });
        }
    }
}