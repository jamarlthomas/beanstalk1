﻿using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.DocumentBase;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.DownloadWidget;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using System.Web.Mvc;
using System.Linq;
using System.Collections.Generic;

namespace CMS.Mvc.Controllers.Afton
{
    public class DocumentBaseController : SidebarPageController
    {
        protected readonly IDocumentConstantProvider _documentConstantProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;

        public DocumentBaseController()
        {
            _documentConstantProvider = new DocumentConstantProvider();
            _treeNodesProvider = new TreeNodesProvider();
        }

        public DocumentBaseController(IDocumentConstantProvider documentConstantProvider,
            ITreeNodesProvider treeNodesProvider)
        {
            _documentConstantProvider = documentConstantProvider;
            _treeNodesProvider = treeNodesProvider;
        }

        public ActionResult GetBaseLayout(DocumentBaseViewModel documentViewModel, TreeNode node)
        {
            //documentViewModel.Constant = MapData<DocumentConstant, DocumentConstantViewModel>(_documentConstantProvider.GetDocumentConstants());


            var parent = node.Parent;
            List<TreeNode> sidebarItems = null;
            if(node.ClassName==CustomNews.CLASS_NAME) {
                sidebarItems = ContentHelper.GetDocByDocId<CustomNews>(node.DocumentID).Fields.SidebarItems2.ToList();
            }
            else
            {
                var document = ContentHelper.GetDocByDocId<Document>(node.DocumentID);
                sidebarItems = document.Fields.SidebarItems2.ToList();

                var faqItems = document.Fields.FAQItems.ToList();
                documentViewModel.FAQList = new List<FAQItemViewModel>();

                foreach (var item in faqItems)
                {
                    documentViewModel.FAQList.Add(MapData<FAQItem, FAQItemViewModel>((FAQItem)item));
                }

            }

            return View("~/Views/Afton/DocumentBase/Index.cshtml", new DocumentBasePageViewModel()
            {
                Document = documentViewModel,
                MenuItemTitle = parent.GetStringValue("Title", parent.NodeAlias),
                BreadCrumb = new BreadCrumbViewModel
                {
                    BreadcrumbLinkItems = _treeNodesProvider.GetBreadcrumb(node.DocumentGUID)
                },
                SideBar = new SidebarViewModel
                {
                    Items = MapSidebar(sidebarItems, node)
                },
                DocumentGuid = node.DocumentGUID
            });
        }

        protected void FillDownLoadButtonSection(DocumentBaseViewModel documentViewModel, TreeNode node)
        {
            var tranlations = _treeNodesProvider.GetAvailableTranslations(node);
            var selectedLanguage = tranlations.FirstOrDefault(t => t.LanguageId.Equals(GetCurrentCulture())) ??
                                   tranlations.FirstOrDefault();

            documentViewModel.DownloadButtonSection = new DownloadButtonSectionViewModel();
            documentViewModel.DownloadButtonSection.DownloadLabel = documentViewModel.Constant.DownloadLabel;
            documentViewModel.DownloadButtonSection.TranslationAvailableLabel = documentViewModel.Constant.TranslationAvailableLabel;
            documentViewModel.DownloadButtonSection.SelectLanguageLabel = documentViewModel.Constant.SelectLanguageLabel;
            documentViewModel.DownloadButtonSection.SelectedLanguage = selectedLanguage;//GetCurrentCulture();
            documentViewModel.DownloadButtonSection.TranslationAvailable = tranlations;

        }
    }
}