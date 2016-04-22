using System;
using System.Linq;
using System.Web.Mvc;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.DocumentsViewModel;
using CMS.Mvc.ViewModels.Generic;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.Helpers;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;


namespace CMS.Mvc.Controllers.Afton
{
    public class GenericController : SidebarPageController
    {
        private readonly IGenericProvider _genericProvider;
        //private readonly IInsightsResourcesProvider _insightsAndResourcesPageProvider;
        private readonly IDocumentConstantProvider _documentConstantProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;

        public GenericController()
        {
            //_insightsAndResourcesPageProvider = new InsightsResourcesProvider();
            _genericProvider = new GenericProvider();
            _documentConstantProvider = new DocumentConstantProvider();
            _treeNodesProvider = new TreeNodesProvider();
        }

        //public GenericController(IInsightsResourcesProvider insightsAndResourcesPageProvider,
        //    IDocumentProvider documentProvider,
        //    IDocumentConstantProvider documentConstantProvider,
        //    ITreeNodesProvider treeNodesProvider)
        //{
        //    _insightsAndResourcesPageProvider = insightsAndResourcesPageProvider;
        //    _documentProvider = documentProvider;
        //    _documentConstantProvider = documentConstantProvider;
        //    _treeNodesProvider = treeNodesProvider;
        //}

        [PageVisitActivity]
        public virtual ActionResult Index(string DocumentName)
        {
            var document = _genericProvider.GetDocument(DocumentName);

            var genericViewModel = MapData<GenericPage, DocumentViewModel>(document);

            genericViewModel.Constant = MapData<DocumentConstant, DocumentConstantViewModel>(_documentConstantProvider.GetDocumentConstants());

            return View("~/Views/Afton/Generic/Index.cshtml", new GenericPageViewModel()
            {
                Document = genericViewModel,
                //MenuItemTitle = _insightsAndResourcesPageProvider.GetInsightsResourcesPageTitle(),
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