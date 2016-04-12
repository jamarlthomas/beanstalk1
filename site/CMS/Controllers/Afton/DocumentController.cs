using System;
using System.Linq;
using System.Web.Mvc;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.DocumentsViewModel;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.Helpers;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;


namespace CMS.Mvc.Controllers.Afton
{
    public class DocumentController : SidebarPageController
    {
        private readonly IDocumentProvider _documentProvider;
        private readonly IInsightsResourcesProvider _insightsAndResourcesPageProvider;
        private readonly IDocumentConstantProvider _documentConstantProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;

        public DocumentController()
        {
            _insightsAndResourcesPageProvider = new InsightsResourcesProvider();
            _documentProvider = new DocumentProvider();
            _documentConstantProvider = new DocumentConstantProvider();
            _treeNodesProvider = new TreeNodesProvider();
        }

        public DocumentController(IInsightsResourcesProvider insightsAndResourcesPageProvider,
            IDocumentProvider documentProvider,
            IDocumentConstantProvider documentConstantProvider,
            ITreeNodesProvider treeNodesProvider)
        {
            _insightsAndResourcesPageProvider = insightsAndResourcesPageProvider;
            _documentProvider = documentProvider;
            _documentConstantProvider = documentConstantProvider;
            _treeNodesProvider = treeNodesProvider;
        }

        [PageVisitActivity]
        public ActionResult Index(string name)
        {
            var document = _documentProvider.GetDocument(name);

            var documentViewModel = MapData<Document, DocumentViewModel>(document);

            documentViewModel.Constant = MapData<DocumentConstant, DocumentConstantViewModel>(_documentConstantProvider.GetDocumentConstants());
            
            return View("~/Views/Afton/Document/Index.cshtml", new DocumentPageViewModel()
            {
                Document = documentViewModel,
                MenuItemTitle = _insightsAndResourcesPageProvider.GetInsightsResourcesPageTitle(),
                BreadCrumb = new BreadCrumbViewModel
                {
                    BreadcrumbLinkItems = _treeNodesProvider.GetBreadcrumb(document.DocumentGUID)
                },
                SideBar = new SidebarViewModel
                {
                    Items = MapSidebar(_sidebarProvider.GetSideBarItems(UtilsHelper.ParseGuids(document.SidebarItems)), document)
                }
            });
        }
    }
}