using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Master;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;

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

            footer.FooterNavCategories = _pagesMenuItemProvider.GetPagesMenuItems().Select(category =>
            {
                var categoryViewModel = MapData<PagesMenuItem, PagesMenuItemViewModel>(category);
                categoryViewModel.FooterNavItems = MapData<FooterNavItem, FooterNavItemViewModel>(_footerNavItemProvider.GetFooterNavItems(category.NodeAlias));
                return categoryViewModel;
            }).ToList();

            return PartialView("~/Views/Afton/Master/_footer.cshtml", footer);
        }

        [ChildActionOnly]
        public ActionResult Header(MasterHeaderRequest request)
        {
            var model = MapData<MasterHeaderRequest, MasterViewModel>(request);
            model.SelectedCulture = UtilsHelper.GetCultureDisplayName(CultureInfo.CurrentCulture);

            model.MainNavList = GetMainNavList();

            model.UtilityNavList = MapData<PagesMenuItem, PagesMenuItemViewModel>(_pagesMenuItemProvider.GetPagesMenuItems());

            return PartialView("~/Views/Afton/Master/_header.cshtml", model);
        }

        private List<ContentMenuItemViewModel> GetMainNavList()
        {
            return _contentMenuItemProvider.GetContentMenuItems().Select(contentMenuItem =>
            {
                var itemViewModel = MapData<ContentMenuItem, ContentMenuItemViewModel>(contentMenuItem);

                var thumbnailedMenuItems = _megaMenuThumbnailedItemProvider.GetMegaMenuThumbnailedItems(contentMenuItem.NodeAlias);
                itemViewModel.ThumbnailedMenuItems = MapData<MegaMenuThumbnailedItem, MegaMenuThumbnailedItemViewModel>(thumbnailedMenuItems);

                var solutionLink = _megaMenuLinkItemProvider.GetMegaMenuLinkItem(contentMenuItem.NodeAlias);
                if (solutionLink != null)
                {
                    itemViewModel.SolutionsLink = MapData<MegaMenuLinkItem, MegaMenuLinkItemViewModel>(solutionLink);
                    var solutions = _solutionBusinessUnitProvider.GetSolutionBusinessUnits(solutionLink.NodeAlias);
                    itemViewModel.SolutionsLink.Solutions = MapData<SolutionBusinessUnit, MegaMenuSolutionBusinessUnitViewModel>(solutions);
                }

                return itemViewModel;
            }).ToList();
        }
    }
}