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
using CMS.DocumentEngine;

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
                categoryViewModel.Reference = FindLink(category.Reference);

                categoryViewModel.FooterNavItems = _footerNavItemProvider.GetFooterNavItems(category.NodeAlias).Select(s =>
                {
                    var result = MapData<FooterNavItem, FooterNavItemViewModel>(s);
                    result.Reference = FindLink(s.Reference);
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
            model.AvailableCultures = MapData<Localization.CultureInfo, CultureLinkViewModel>(_localizationProvider.GetAvailableCultures());
            model.SelectedCulture = _localizationProvider.GetCurrentCultureDisplayName();//UtilsHelper.GetCultureDisplayName(CultureInfo.CurrentCulture);

            model.MainNavList = GetMainNavList();

            model.UtilityNavList = _pagesMenuItemProvider.GetPagesMenuItems().Select(s =>
            {
                var result = MapData<PagesMenuItem, PagesMenuItemViewModel>(s);
                result.Reference = FindLink(s.Reference);
                return result;
            }).ToList();

            return PartialView("~/Views/Afton/Master/_header.cshtml", model);
        }

        private List<ContentMenuItemViewModel> GetMainNavList()
        {
            return _contentMenuItemProvider.GetContentMenuItems().Select(contentMenuItem =>
            {
                var itemViewModel = MapData<ContentMenuItem, ContentMenuItemViewModel>(contentMenuItem);
                itemViewModel.Reference = FindLink(contentMenuItem.Reference);

                itemViewModel.ThumbnailedMenuItems = _megaMenuThumbnailedItemProvider.GetMegaMenuThumbnailedItems(contentMenuItem.NodeAlias).Select(thumbnailedMenuItem =>
                {
                    var result = MapData<MegaMenuThumbnailedItem, MegaMenuThumbnailedItemViewModel>(thumbnailedMenuItem);
                    if (!string.IsNullOrEmpty(thumbnailedMenuItem.ManualLink))
                    {
                        result.Reference = thumbnailedMenuItem.ManualLink;
                    }
                    else
                    {
                        if (!string.IsNullOrEmpty(thumbnailedMenuItem.Reference))
                        {
                            result.Reference = FindLink(thumbnailedMenuItem.Reference);
                        }
                    }
                    return result;
                }).ToList();

                var solutionLink = _megaMenuLinkItemProvider.GetMegaMenuLinkItem(contentMenuItem.NodeAlias);
                if (solutionLink != null)
                {
                    itemViewModel.SolutionsLink = MapData<MegaMenuLinkItem, MegaMenuLinkItemViewModel>(solutionLink);

                    itemViewModel.SolutionsLink.Reference = FindLink(solutionLink.Reference);

                    itemViewModel.SolutionsLink.Solutions = _megaMenuSubLinkItemProvider.GetMegaMenuSubLinkItems(solutionLink.NodeAlias).Select(subItem =>
                    {
                        var result = MapData<MegaMenuSubLinkItem, MegaMenuSubLinkItemViewModel>(subItem);
                        result.Reference = FindLink(subItem.Reference);
                        return result;
                    }).ToList();
                }

                return itemViewModel;
            }).ToList();
        }

        private string FindLink(string reference)
        {
            var newGUID = UtilsHelper.ParseGuids(reference);
            if (newGUID.Count != 0)
            {
                var treeNode = _treeNodesProvider.GetTreeNodeByNodeGuid(newGUID.Last());
                if (treeNode == null)
                {
                    treeNode = ContentHelper.GetDocByNodeId<TreeNode>(ContentHelper.GetNodeByNodeGuid(newGUID.Last()));
                    //treeNode = ContentHelper.GetNodeByGuid<TreeNode>(newGUID.Last());
                    return (treeNode != null && ((treeNode as IRoutedModel) != null)) ? (treeNode as IRoutedModel).DocumentRoutePath : "#";
                }
                else
                {
                    return (treeNode != null && ((treeNode as IRoutedModel) != null)) ? (treeNode as IRoutedModel).DocumentRoutePath : "#";
                }
            }
            return "#";
            /*else
            {
                var treeNode = _treeNodesProvider.GetTreeNodeByPath(reference);
                return (treeNode != null && ((treeNode as IRoutedModel) != null)) ? (treeNode as IRoutedModel).DocumentRoutePath : "#";
            }*/

        }
        private string FindLink(Guid reference)
        {
                var treeNode = _treeNodesProvider.GetTreeNodeByNodeGuid(reference);
                return (treeNode != null && ((treeNode as IRoutedModel) != null)) ? (treeNode as IRoutedModel).DocumentRoutePath : "#";


        }
    }
}