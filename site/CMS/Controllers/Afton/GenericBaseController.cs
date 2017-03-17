using System;
using System.Collections;
using System.Linq;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using CMS.DocumentEngine;
using CMS.DataEngine;
using CMS.DocumentEngine.Types;
using CMS.Localization;
using CMS.Membership;
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
        
        public ActionResult AddSubject( string subject )
        {
            if ( !string.IsNullOrEmpty( subject ) )
            {
                TempData[ "subject" ] = subject;
            }
            return RedirectToRoute( "ContactPage" );
        }

        [PageVisitActivity]
        public virtual ActionResult Index(string DocumentName)
        {
            
            var document = _genericProvider.GetDocument(DocumentName);
            if ( !document.IsPublished || Request.QueryString["preview"] != null)
            {
                if ( DocumentSecurityHelper.IsAuthorizedPerDocument( document, NodePermissionsEnum.Read, true, LocalizationContext.CurrentCulture.CultureCode, MembershipContext.AuthenticatedUser ) != AuthorizationResultEnum.Allowed )
                {
                    return Redirect( "~/cmspages/logon.aspx" + "?ReturnUrl=" + Request.Path+"%3Fpreview%3Dtrue" );
                }
            }

            var genericViewModel = MapData<T, DocumentViewModel>(document);

            genericViewModel.Constant = MapData<DocumentConstant, DocumentConstantViewModel>(_documentConstantProvider.GetDocumentConstants());
            
            if (document.NodeClassName == LogisticsAndSupplyFolder.CLASS_NAME)
            {
                genericViewModel.map = true;
            }
            else {
                genericViewModel.map = false; 
            }
            List<TreeNode> sidebarItem = null;

            if (document.ClassName == GenericPage.CLASS_NAME)
            {
                var newdoc = ContentHelper.GetDocByDocId<GenericPage>(document.DocumentID);
                sidebarItem = newdoc.Fields.SidebarItems2.ToList();

                var faqItems = newdoc.Fields.FAQItems.ToList();
                genericViewModel.FAQList = new List<FAQItemViewModel>();

                foreach (var item in faqItems)
                {
                    genericViewModel.FAQList.Add(MapData<FAQItem, FAQItemViewModel>((FAQItem)item));
                }
            }
            else if (document.ClassName == Product.CLASS_NAME)
            {
                var newdoc = ContentHelper.GetDocByDocId<Product>(document.DocumentID);
                sidebarItem = newdoc.Fields.SidebarItems2.ToList();

            }
            else if (document.ClassName == Document.CLASS_NAME)
            {
                var newdoc = ContentHelper.GetDocByDocId<Document>(document.DocumentID);
                sidebarItem = newdoc.Fields.SidebarItems2.ToList();

            }
            else if (document.ClassName == Solution.CLASS_NAME)
            {
                var newdoc = ContentHelper.GetDocByDocId<Solution>(document.DocumentID);
                sidebarItem = newdoc.Fields.SidebarItems2.ToList();

            }
            else if (document.ClassName == LogisticsAndSupply.CLASS_NAME)
            {
                var newdoc = ContentHelper.GetDocByDocId<LogisticsAndSupply>(document.DocumentID);
                sidebarItem = newdoc.Fields.SidebarItems2.ToList();

            }
            else if (document.ClassName == LogisticsAndSupplyFolder.CLASS_NAME)
            {
                var newdoc = ContentHelper.GetDocByDocId<LogisticsAndSupplyFolder>(document.DocumentID);
                sidebarItem = newdoc.Fields.SidebarItems2.ToList();

            }
            else if (document.ClassName == TermsAndAcronymsPage.CLASS_NAME)
            {
                var newdoc = ContentHelper.GetDocByDocId<TermsAndAcronymsPage>(document.DocumentID);
                sidebarItem = newdoc.Fields.SidebarItems2.ToList();

            }
            else
            {
                sidebarItem = _sidebarProvider.GetSideBarItems(UtilsHelper.ParseGuids(document.GetValue("SidebarItems","")));
            }
            var CampaignVal = false;
            if ( document.GetValue( "Campaign" ) != null ) { CampaignVal = ( bool )document.GetValue( "Campaign" ); }
            var SubjectName = "";
            if ( document.GetValue( "SubjectName" ) != null ) { SubjectName = ( string )document.GetValue( "SubjectName" ); }
            var CampaignURL = "/AddSubject/"+SubjectName;
            return View("~/Views/Afton/Generic/Index.cshtml", new GenericPageViewModel()
            {
                Document = genericViewModel,
                BreadCrumb = new BreadCrumbViewModel
                {
                    BreadcrumbLinkItems = _treeNodesProvider.GetBreadcrumb(document.DocumentGUID)
                },
                SideBar = new SidebarViewModel
                {
                    Items =  MapSidebar(sidebarItem, document)
                },
                Campaign = CampaignVal,
                SubjectName = SubjectName,
                CampaignURL = CampaignURL
                
            });
        }
    }
}