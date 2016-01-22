using System.Globalization;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.Helpers;
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
        private readonly IFooterNavItemProvider _footerNavItemProvider;

        public MasterController(IContentMenuItemProvider contentMenuItemProvider,
            IPagesMenuItemProvider pagesMenuItemProvider,
            IMegaMenuThumbnailedItemProvider megaMenuThumbnailedItemProvider,
            IMegaMenuLinkItemProvider megaMenuLinkItemProvider,
            ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
            IFooterNavItemProvider footerNavItemProvider)
        {
            _contentMenuItemProvider = contentMenuItemProvider;
            _pagesMenuItemProvider = pagesMenuItemProvider;
            _megaMenuThumbnailedItemProvider = megaMenuThumbnailedItemProvider;
            _megaMenuLinkItemProvider = megaMenuLinkItemProvider;
            _solutionBusinessUnitProvider = solutionBusinessUnitProvider;
            _footerNavItemProvider = footerNavItemProvider;
        }

        public MasterController()
        {
            _contentMenuItemProvider = new ContentMenuItemProvider();
            _pagesMenuItemProvider = new PagesMenuItemProvider();
            _megaMenuThumbnailedItemProvider = new MegaMenuThumbnailedItemProvider();
            _megaMenuLinkItemProvider = new MegaMenuLinkItemProvider();
            _solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
            _footerNavItemProvider = new FooterNavItemProvider();
        }

        [ChildActionOnly]
        public ActionResult Footer()
        {
            var footer = new FooterViewModel();
			footer.FooterNavCategories = MapData<PagesMenuItem, PagesMenuItemViewModel>(_pagesMenuItemProvider.GetPagesMenuItems());
            foreach (var category in footer.FooterNavCategories)
            {
                category.FooterNavItems = MapData<FooterNavItem, FooterNavItemViewModel>(_footerNavItemProvider.GetFooterNavItems(category.Title));
            }
            return PartialView("~/Views/Afton/Master/_footer.cshtml", footer);
        }

        [ChildActionOnly]
        public ActionResult Index(string title)
        {
            var mainNavList = MapData<ContentMenuItem, ContentMenuItemViewModel>(_contentMenuItemProvider.GetContentMenuItems());
            foreach (var contentMenuItem in mainNavList)
            {
                contentMenuItem.ThumbnailedMenuItems = MapData<MegaMenuThumbnailedItem, MegaMenuThumbnailedItemViewModel>(_megaMenuThumbnailedItemProvider.GetMegaMenuThumbnailedItems(contentMenuItem.Title));
                var solutionLink = _megaMenuLinkItemProvider.GetMegaMenuLinkItems(contentMenuItem.Title).FirstOrDefault();
                if (solutionLink != null)
                {
                    contentMenuItem.SolutionsLink = MapData<MegaMenuLinkItem, MegaMenuLinkItemViewModel>(solutionLink);
					contentMenuItem.SolutionsLink.Solutions = MapData<SolutionBusinessUnit, MegaMenuSolutionBusinessUnitViewModel>(_solutionBusinessUnitProvider.GetSolutionBusinessUnits(contentMenuItem.SolutionsLink.Title));
                }
            }
            return PartialView("~/Views/Afton/Master/_header.cshtml", new MasterViewModel
            {
                SelectedCulture = CultureHelper.GetCultureDisplayName(CultureInfo.CurrentCulture),
                MainNavList = mainNavList,
                UtilityNavList = MapData<PagesMenuItem, PagesMenuItemViewModel>(_pagesMenuItemProvider.GetPagesMenuItems()),
				Title = title
            });
        }
    }
}