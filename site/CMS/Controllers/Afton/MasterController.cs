using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Mvc;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Master;

namespace CMS.Mvc.Controllers.Afton
{
    public class MasterController : BaseController
    {
        private readonly IContentMenuItemProvider _contentMenuItemProvider;
        private readonly IFooterNavItemProvider _footerNavItemProvider;
        private readonly IMegaMenuLinkItemProvider _megaMenuLinkItemProvider;
        private readonly IMegaMenuSubLinkItemProvider _megaMenuSubLinkItemProvider;
        private readonly IMegaMenuThumbnailedItemProvider _megaMenuThumbnailedItemProvider;
        private readonly IPagesMenuItemProvider _pagesMenuItemProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;
        private readonly ILocalizationProvider _localizationProvider;

        public MasterController(IContentMenuItemProvider contentMenuItemProvider,
            IPagesMenuItemProvider pagesMenuItemProvider,
            IMegaMenuThumbnailedItemProvider megaMenuThumbnailedItemProvider,
            IMegaMenuLinkItemProvider megaMenuLinkItemProvider,
            IFooterNavItemProvider footerNavItemProvider,
            IMegaMenuSubLinkItemProvider megaMenuSubLinkItemProvider,
            ITreeNodesProvider treeNodesProvider)
        {
            _contentMenuItemProvider = contentMenuItemProvider;
            _pagesMenuItemProvider = pagesMenuItemProvider;
            _megaMenuThumbnailedItemProvider = megaMenuThumbnailedItemProvider;
            _megaMenuLinkItemProvider = megaMenuLinkItemProvider;
            _footerNavItemProvider = footerNavItemProvider;
            _megaMenuSubLinkItemProvider = megaMenuSubLinkItemProvider;
            _treeNodesProvider = treeNodesProvider;
        }

        public MasterController()
        {
            _contentMenuItemProvider = new ContentMenuItemProvider();
            _pagesMenuItemProvider = new PagesMenuItemProvider();
            _megaMenuThumbnailedItemProvider = new MegaMenuThumbnailedItemProvider();
            _megaMenuLinkItemProvider = new MegaMenuLinkItemProvider();
            _footerNavItemProvider = new FooterNavItemProvider();
            _megaMenuSubLinkItemProvider = new MegaMenuSubLinkItemProvider();
            _treeNodesProvider = new TreeNodesProvider();
            _localizationProvider = new LocalizationProvider();
        }

        [ChildActionOnly]
        public ActionResult Footer()
        {
            var footer = new FooterViewModel();

            footer.FooterNavCategories = _pagesMenuItemProvider.GetPagesMenuItems().Select(category =>
            {
                var categoryViewModel = MapData<PagesMenuItem, PagesMenuItemViewModel>(category);
                categoryViewModel.Reference = GetLinkByGuid(UtilsHelper.ParseGuids(category.Reference).Last());

                categoryViewModel.FooterNavItems = _footerNavItemProvider.GetFooterNavItems(category.NodeAlias).Select(s =>
                {
                    var result = MapData<FooterNavItem, FooterNavItemViewModel>(s);
                    result.Reference = GetLinkByGuid(UtilsHelper.ParseGuids(s.Reference).Last());
                    return result;
                }).ToList();

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

            model.UtilityNavList = _pagesMenuItemProvider.GetPagesMenuItems().Select(s =>
            {
                var result = MapData<PagesMenuItem, PagesMenuItemViewModel>(s);
                result.Reference = GetLinkByGuid(UtilsHelper.ParseGuids(s.Reference).Last());
                return result;
            }).ToList();
            List<Localization.CultureInfo> cultures = _localizationProvider.GetAvailableCultures();
            model.AvailableCultures = MapData<Localization.CultureInfo, CultureLinkViewModel>(cultures);
            return PartialView("~/Views/Afton/Master/_header.cshtml", model);
        }

        private List<ContentMenuItemViewModel> GetMainNavList()
        {
            return _contentMenuItemProvider.GetContentMenuItems().Select(contentMenuItem =>
            {
                var itemViewModel = MapData<ContentMenuItem, ContentMenuItemViewModel>(contentMenuItem);
                itemViewModel.Reference = GetLinkByGuid(UtilsHelper.ParseGuids(contentMenuItem.Reference).Last());

                itemViewModel.ThumbnailedMenuItems = _megaMenuThumbnailedItemProvider.GetMegaMenuThumbnailedItems(contentMenuItem.NodeAlias).Select(thumbnailedMenuItem =>
                {
                    var result = MapData<MegaMenuThumbnailedItem, MegaMenuThumbnailedItemViewModel>(thumbnailedMenuItem);
                    if (!string.IsNullOrEmpty(thumbnailedMenuItem.Reference))
                    {
                        result.Reference = GetLinkByGuid(UtilsHelper.ParseGuids(thumbnailedMenuItem.Reference).Last());
                    }
                    return result;
                }).ToList();

                var solutionLink = _megaMenuLinkItemProvider.GetMegaMenuLinkItem(contentMenuItem.NodeAlias);
                if (solutionLink != null)
                {
                    itemViewModel.SolutionsLink = MapData<MegaMenuLinkItem, MegaMenuLinkItemViewModel>(solutionLink);

                    itemViewModel.SolutionsLink.Reference = GetLinkByGuid(UtilsHelper.ParseGuids(solutionLink.Reference).Last());

                    itemViewModel.SolutionsLink.Solutions = _megaMenuSubLinkItemProvider.GetMegaMenuSubLinkItems(solutionLink.NodeAlias).Select(subItem =>
                    {
                        var result = MapData<MegaMenuSubLinkItem, MegaMenuSubLinkItemViewModel>(subItem);

                        result.Reference = GetLinkByGuid(subItem.Reference);
                        return result;
                    }).ToList();
                }

                return itemViewModel;
            }).ToList();
        }

        private string GetLinkByGuid(Guid guid)
        {
            var treeNode = _treeNodesProvider.GetTreeNodeByNodeGuid(guid);
            return (treeNode != null && ((treeNode as IRoutedModel) != null)) ? (treeNode as IRoutedModel).DocumentRoutePath : "#";
        }
    }
}