using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.DocumentBase;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class DocumentBaseController : SidebarPageController
    {
        private readonly IDocumentConstantProvider _documentConstantProvider;
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
            documentViewModel.Constant = MapData<DocumentConstant, DocumentConstantViewModel>(_documentConstantProvider.GetDocumentConstants());
            var parent = node.Parent;
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
                    Items = MapSidebar(_sidebarProvider.GetSideBarItems(UtilsHelper.ParseGuids(node.GetStringValue("SidebarItems", string.Empty))), node)
                }
            });
        }
    }
}