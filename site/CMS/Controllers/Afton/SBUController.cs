using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.SBU;
using CMS.Mvc.ViewModels.Shared;
using System.Web.Mvc;

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

        public ActionResult Index(string alias)
        {
            var sbu = _solutionBusinessUnitProvider.GetSolutionBusinessUnit(alias);
            var model = MapData<SolutionBusinessUnit, SBUViewModel>(sbu);
            var separatedDescription = DivideHelper.SeparateText(sbu.Description);
            model.LeftDescription = separatedDescription[0];
            model.RightDescription = separatedDescription[1];
            model.AnchorMenu = MapData<AnchorMenuItem, AnchorMenuItemViewModel>(_anchorMenuItemProvider.GetAnchorMenuItems());
            model.FAQs = MapData<FAQItem, FAQItemViewModel>(_FAQItemProvider.GetFAQItemUnits(alias));
            model.DocumentTypes = MapData<DocumentType, DocumentTypeViewModel>(_documentTypeProvider.GetDocumentTypeUnits(alias));
            foreach (var item in model.DocumentTypes)
            {
                item.Documents = MapData<Document, DocumentViewModel>(_documentProvider.GetDocumentUnits(item.Title));
            }
            model.Solutions = MapData<Solution, SolutionViewModel>(_solutionProvider.GetSolutionItems(alias));
            return View("~/Views/Afton/SBU/Index.cshtml", model);
        }
    }
}
