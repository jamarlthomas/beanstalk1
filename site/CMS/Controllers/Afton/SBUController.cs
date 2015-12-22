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
        private readonly IAnchorMenuItemProvider _anchorMenuItemProvider;
        private readonly IDocumentProvider _documentProvider;
        private readonly IFAQItemProvider _FAQItemProvider;
        private readonly IDocumentTypeProvider _documentTypeProvider;
        private readonly ISolutionProvider _solutionProvider;

        public SBUController()
        {
            _anchorMenuItemProvider = new AnchorMenuItemProvider();
            _solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
            _documentProvider = new DocumentProvider();
            _FAQItemProvider = new FAQItemProvider();
            _documentTypeProvider = new DocumentTypeProvider();
            _solutionProvider = new SolutionProvider();
        }

        public SBUController(ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
            IAnchorMenuItemProvider anchorMenuItemProvider,
            IDocumentProvider documentProvider,
            IFAQItemProvider FAQItemProvider,
            IDocumentTypeProvider documentTypeProvider,
            ISolutionProvider solutionProvider)
        {
            _solutionBusinessUnitProvider = solutionBusinessUnitProvider;
            _anchorMenuItemProvider = anchorMenuItemProvider;
            _documentProvider = documentProvider;
            _FAQItemProvider = FAQItemProvider;
            _documentTypeProvider = documentTypeProvider;
            _solutionProvider = solutionProvider;
        }

        public ActionResult Index(string name)
        {
            var model = MapData<SolutionBusinessUnit, SBUViewModel>(_solutionBusinessUnitProvider.GetSolutionBusinessUnit(name));
            model.AnchorMenu = MapData<AnchorMenuItem, AnchorMenuItemViewModel>(_anchorMenuItemProvider.GetAnchorMenuItems());
            model.FAQs = MapData<FAQItem, FAQItemViewModel>(_FAQItemProvider.GetFAQItemUnits(name));
            model.DocumentTypes = MapData<DocumentType, DocumentTypeViewModel>(_documentTypeProvider.GetDocumentTypeUnits(name));
            foreach (var item in model.DocumentTypes)
            {
                item.Documents = MapData<Document, DocumentViewModel>(_documentProvider.GetDocumentUnits(item.Title));
            }
            model.Solutions = MapData<Solution, SolutionViewModel>(_solutionProvider.GetSolutionItems(name));
            return View("~/Views/Afton/SBU/Index.cshtml", model);
        }
    }
}
