using CMS.Mvc.Helpers;
using System.Linq;
using CMS.Mvc.ViewModels.RateContent;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.DocumentBase;
using System;
using System.Web.Mvc;
using CMS.Mvc.Infrastructure.Models;
using System.Net;
using System.Collections.Generic;


namespace CMS.Mvc.Controllers.Afton
{
    public class RateContentController : BaseController
    {
        private readonly IRateContentConstantsProvider _rateContentConstantsProvider;
        private readonly IRateContentProvider _rateContentProvider;
        private readonly IRateContentFolderProvider _rateContentFolderProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;
        private readonly IContactProvider _contactProvider;

        public RateContentController()
        {
            _rateContentConstantsProvider = new RateContentConstantsProvider();
            _rateContentProvider = new RateContentProvider();
            _rateContentFolderProvider = new RateContentFolderProvider();
            _treeNodesProvider = new TreeNodesProvider();
            _contactProvider = new ContactProvider();
        }

        public RateContentController(IRateContentConstantsProvider rateContentConstantsProvider,
            IRateContentProvider rateContentProvider,
            IRateContentFolderProvider rateContentFolderProvider,
            ITreeNodesProvider treeNodesProvider,
            IContactProvider contactProvider)
        {
            _rateContentConstantsProvider = rateContentConstantsProvider;
            _rateContentProvider = rateContentProvider;
            _rateContentFolderProvider = rateContentFolderProvider;
            _treeNodesProvider = treeNodesProvider;
            _contactProvider = contactProvider;
        }

        [Authorize(Roles = "_authenticated_")]
        public ActionResult Results(string Request)
        {
            List<RateContent> rateContentResults;
            if (string.IsNullOrEmpty(Request))
            {
                rateContentResults = _rateContentProvider.GetRateContentItems();
            }
            else
            {
                rateContentResults = _rateContentProvider.GetRateContentItemsByRatedDocumentAlias(Request);
            }

            var viewModel = new RateContentResultsViewModel
            {
                Items = rateContentResults.Select(MapRateContent).ToList()
            };

            return View("~/Views/Afton/RateContent/Index.cshtml", viewModel);
        }

        private RateContentResultItemViewModel MapRateContent(RateContent rateContent)
        {
            var rateContentViewModel = MapData<RateContent, RateContentResultItemViewModel>(rateContent);
            rateContentViewModel.ContactTitle = _contactProvider.GetContactNameByGuid(rateContent.RatedContact);
            var ratedDocument = _treeNodesProvider.GetTreeNodeByNodeGuid(rateContent.RatedDocument);
            rateContentViewModel.DocumentTitle = ratedDocument.GetStringValue("Title", ratedDocument.NodeAlias);
            rateContentViewModel.DocumentLink = ratedDocument.DocumentNamePath;
            rateContentViewModel.DocumentRateResultsLink = RouteHelper.GetRateContentResultsLink(ratedDocument.NodeAlias);
            return rateContentViewModel;
        }

        public PartialViewResult Widget(Guid Request)
        {
            var model = MapData<RateContentConstants, RateContentWidgetViewModel>(_rateContentConstantsProvider.GetRateContentConstants());
            model.DocumentGuid = Request;
            return PartialView("~/Views/Afton/RateContent/_widget.cshtml", model);
        }

        [HttpGet]
        public JsonResult Submit(RateContentRequest Request)
        {
            var yesLabel = _rateContentConstantsProvider.GetRateContentConstants().YesLabel;
            var id = _rateContentProvider.SaveRateContent(Request, _rateContentFolderProvider.GetRateContentFolder(), yesLabel);
            var result = new
            {
				Rating = new[] { new { id } }
	        };
            return Json(result, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult Submit(RateContentCommentRequest Request)
        {
            _rateContentProvider.UpdateRateContent(Request);
            return new HttpStatusCodeResult(HttpStatusCode.OK);
        }
    }
}