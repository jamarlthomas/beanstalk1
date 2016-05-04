using System;
using System.Linq;
using System.Web.Mvc;
using System.Web;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.DocumentBase;
using CMS.Mvc.ViewModels.Generic;
using CMS.Mvc.ViewModels.Shared;
using CMS.Mvc.Helpers;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;


namespace CMS.Mvc.Controllers.Afton
{
    public class GenericBaseController<T> : SidebarPageController where T: TreeNode, new ()
    {
        private readonly IGenericProvider<T> _genericProvider;
        private readonly IDocumentConstantProvider _documentConstantProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;

        public GenericBaseController()
        {
            _genericProvider = new GenericProvider<T>();
            _documentConstantProvider = new DocumentConstantProvider();
            _treeNodesProvider = new TreeNodesProvider();
        }


        [PageVisitActivity]
        public virtual ActionResult Index(string DocumentName)
        {
            
            var document = _genericProvider.GetDocument(DocumentName);

            var genericViewModel = MapData<T, DocumentViewModel>(document);
            genericViewModel.Constant = MapData<DocumentConstant, DocumentConstantViewModel>(_documentConstantProvider.GetDocumentConstants());

            return View("~/Views/Afton/Generic/Index.cshtml", new GenericPageViewModel()
            {
                Document = genericViewModel,
                BreadCrumb = new BreadCrumbViewModel
                {
                    BreadcrumbLinkItems = _treeNodesProvider.GetBreadcrumb(document.DocumentGUID)
                },
                SideBar = new SidebarViewModel
                {
                    Items = MapSidebar(_sidebarProvider.GetSideBarItems(UtilsHelper.ParseGuids(document.GetValue("SidebarItems",""))), document)
                }
            });
        }
    }
}