using CMS.DocumentEngine;
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
                sidebarItems = ContentHelper.GetDocByDocId<Document>(node.DocumentID).Fields.SidebarItems2.ToList();
            }
            if (sidebarItems.Count() == 0)
            {
                sidebarItems = _sidebarProvider.GetSideBarItems(UtilsHelper.ParseGuids(node.GetStringValue("SidebarItems",string.Empty)));
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
            documentViewModel.DownloadButtonSection = new DownloadButtonSectionViewModel();
            documentViewModel.DownloadButtonSection.DownloadLabel = documentViewModel.Constant.DownloadLabel;
            documentViewModel.DownloadButtonSection.TranslationAvailableLabel = documentViewModel.Constant.TranslationAvailableLabel;
            documentViewModel.DownloadButtonSection.SelectLanguageLabel = documentViewModel.Constant.SelectLanguageLabel;
            documentViewModel.DownloadButtonSection.CurrentLanguageId = GetCurrentCulture();
            documentViewModel.DownloadButtonSection.TranslationAvailable =_treeNodesProvider.GetAvailableTranslations(node);

        }
    }
}