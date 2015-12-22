using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Home;
using CMS.Mvc.ViewModels.SBU;
using System.Web.Mvc;
using System.Linq;

namespace CMS.Mvc.Controllers.Afton
{
    public class SBUController : BaseController
    {
        private readonly ISolutionBusinessUnitProvider _solutionBusinessUnitProvider;
        private readonly IDocumentProvider _documentProvider;
        private readonly IFAQItemProvider _FAQItemProvider;
        private readonly IDocumentTypeProvider _documentTypeProvider;
        private readonly ISolutionProvider _solutionProvider;

        public SBUController()
        {
            _solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
            _documentProvider = new DocumentProvider();
            _FAQItemProvider = new FAQItemProvider();
            _documentTypeProvider = new DocumentTypeProvider();
            _solutionProvider = new SolutionProvider();
        }

        public SBUController(ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
            IDocumentProvider documentProvider,
            IFAQItemProvider FAQItemProvider,
            IDocumentTypeProvider documentTypeProvider,
            ISolutionProvider solutionProvider)
        {
            _solutionBusinessUnitProvider = solutionBusinessUnitProvider;
            _documentProvider = documentProvider;
            _FAQItemProvider = FAQItemProvider;
            _documentTypeProvider = documentTypeProvider;
            _solutionProvider = solutionProvider;
        }

        public ActionResult Index(string name)
        {
            var model = MapData<SolutionBusinessUnit, SBUViewModel>(_solutionBusinessUnitProvider.GetSolutionBusinessUnit(name));
            model.FAQs = MapData<FAQItem, FAQItemViewModel>(_FAQItemProvider.GetFAQItemUnits(name)).Take(4).ToList();
			model.DocumentTypes = MapData<DocumentType, DocumentTypeViewModel>(_documentTypeProvider.GetDocumentTypeUnits(name));
            foreach (var item in model.DocumentTypes)
            {
                item.Documents = MapData<Document, DocumentViewModel>(_documentProvider.GetDocumentUnits(item.Title));
            }
			model.Solutions = MapData<Solution, SolutionViewModel>(_solutionProvider.GetSolutionItems(name)).Where(w => !string.IsNullOrEmpty(w.HomeImage)).ToList();
            return View("~/Views/Afton/SBU/Index.cshtml", model);
        }
    }
}
