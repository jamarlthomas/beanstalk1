using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.DocumentBase;
using System.Web.Mvc;
using CMS.Localization;
using CMS.Membership;
using CMS.DataEngine;

namespace CMS.Mvc.Controllers.Afton
{
    public class DocumentController : DocumentBaseController
    {
        private readonly IDocumentProvider _documentProvider;

        public DocumentController()
        {
            _documentProvider = new DocumentProvider();
        }

        public DocumentController(IDocumentProvider documentProvider)
        {
            _documentProvider = documentProvider;
        }

        [PageVisitActivity]
        public ActionResult Index(string DocumentName)
        {
            var document = _documentProvider.GetDocument(DocumentName);
            if ( !document.IsPublished)  {
                if ( DocumentSecurityHelper.IsAuthorizedPerDocument( document, NodePermissionsEnum.Read, true, LocalizationContext.CurrentCulture.CultureCode, MembershipContext.AuthenticatedUser ) != AuthorizationResultEnum.Allowed )
                {
                    return Redirect( "~/cmspages/logon.aspx" +"?ReturnUrl="+Request.Path);
                }
            }
            var documentViewModel = MapData<Document, DocumentBaseViewModel>(document);
            documentViewModel.Constant = MapData<DocumentConstant, DocumentConstantViewModel>(_documentConstantProvider.GetDocumentConstants());
            FillDownLoadButtonSection(documentViewModel, document);
            return GetBaseLayout(documentViewModel, document);
        }
    }
}