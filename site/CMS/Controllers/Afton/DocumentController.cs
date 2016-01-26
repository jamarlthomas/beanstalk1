using System;
using System.Linq;
using System.Web.Mvc;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Document;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.Controllers.Afton
{
	public class DocumentController : BaseController
	{
		private readonly IDocumentProvider _documentProvider;
		private readonly IInsightsResourcesProvider _insightsAndResourcesPageProvider;

		public DocumentController()
		{
			_insightsAndResourcesPageProvider = new InsightsResourcesProvider();
			_documentProvider = new DocumentProvider();
		}

		public DocumentController(IInsightsResourcesProvider insightsAndResourcesPageProvider,
			IDocumentProvider documentProvider)
		{
			_insightsAndResourcesPageProvider = insightsAndResourcesPageProvider;
			_documentProvider = documentProvider;
		}

		public ActionResult Index(string name)
		{
			var document = _documentProvider.GetDocument(name);
			if (document == null) return null;

			var documentViewModel = MapData<Document, DocumentViewModel>(document);

			if (documentViewModel.DocumentPublishFrom == default(DateTime))
			{
				documentViewModel.DocumentPublishFrom = (DateTime) document.GetValue("DocumentCreatedWhen");
			}

			return View("~/Views/Afton/Document/Index.cshtml", new DocumentPageViewModel()
			{
				Document = documentViewModel,
				MenuItemTitle = _insightsAndResourcesPageProvider.GetInsightsResources().First().Title
			});
		}
	}
}