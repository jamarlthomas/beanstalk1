﻿using System;
using System.Linq;
using System.Web.Mvc;
using CMS.DocumentEngine.Types;
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

        public DocumentController()
        {
            _insightsAndResourcesPageProvider = new InsightsResourcesProvider();
            _documentProvider = new DocumentProvider();
            _documentConstantProvider = new DocumentConstantProvider();
        }

        public DocumentController(IInsightsResourcesProvider insightsAndResourcesPageProvider,
            IDocumentProvider documentProvider,
            IDocumentConstantProvider documentConstantProvider)
        {
            _insightsAndResourcesPageProvider = insightsAndResourcesPageProvider;
            _documentProvider = documentProvider;
            _documentConstantProvider = documentConstantProvider;
        }

        public ActionResult Index(string name)
        {
            var document = _documentProvider.GetDocument(name);
            if (document == null) return null;

            var documentViewModel = MapData<Document, DocumentViewModel>(document);

            if (documentViewModel.DocumentPublishFrom == default(DateTime))
            {
                documentViewModel.DocumentPublishFrom = (DateTime)document.GetValue("DocumentCreatedWhen");
            }
            
            documentViewModel.DocumentPublishFrom = TimeZoneInfo.ConvertTime(documentViewModel.DocumentPublishFrom, TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time"));
            documentViewModel.Constant = MapData<DocumentConstant, DocumentConstantViewModel>(_documentConstantProvider.GetDocumentConstants().First());
            
            return View("~/Views/Afton/Document/Index.cshtml", new DocumentPageViewModel()
            {
                Document = documentViewModel,
                MenuItemTitle = _insightsAndResourcesPageProvider.GetInsightsResources().First().Title,
                BreadCrumb = new BreadCrumbViewModel
                {
                    BreadcrumbLinkItems = _documentProvider.GetBreadcrumb(name)
                },
                SideBar = new SidebarViewModel
                {
                    Items = MapSidebar(_sidebarProvider.GetSideBarItems(StringToGuidsConvertHelper.ParseGuids(document.SidebarItems)), document)
                }
            });
        }
    }
}