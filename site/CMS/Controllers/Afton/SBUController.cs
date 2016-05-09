using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.SBU;
using CMS.Mvc.ViewModels.Shared;
using System.Linq;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class SBUController : BaseController
    {
        private readonly ISolutionBusinessUnitProvider _solutionBusinessUnitProvider;
        private readonly IDocumentProvider _documentProvider;
        private readonly IFAQItemProvider _FAQItemProvider;
        private readonly IDocumentTypeProvider _documentTypeProvider;
        private readonly ISolutionProvider _solutionProvider;
        private readonly IProductProvider _productProvider;

        public SBUController()
        {
            _solutionBusinessUnitProvider = new SolutionBusinessUnitProvider();
            _documentProvider = new DocumentProvider();
            _FAQItemProvider = new FAQItemProvider();
            _documentTypeProvider = new DocumentTypeProvider();
            _solutionProvider = new SolutionProvider();
            _productProvider = new ProductProvider();

        }

        public SBUController(ISolutionBusinessUnitProvider solutionBusinessUnitProvider,
            IDocumentProvider documentProvider,
            IFAQItemProvider FAQItemProvider,
            IDocumentTypeProvider documentTypeProvider,
            ISolutionProvider solutionProvider, IProductProvider productProvider)
        {
            _solutionBusinessUnitProvider = solutionBusinessUnitProvider;
            _documentProvider = documentProvider;
            _FAQItemProvider = FAQItemProvider;
            _documentTypeProvider = documentTypeProvider;
            _solutionProvider = solutionProvider;
            _productProvider = productProvider;
        }
        [PageVisitActivity]
        public ActionResult Index(string SBUName)
        {
            var sbu = _solutionBusinessUnitProvider.GetSolutionBusinessUnit(SBUName);
            var model = MapData<SolutionBusinessUnit, CMS.Mvc.ViewModels.Shared.SBUViewModel>(sbu);
            model.FAQs = MapData<FAQItem, FAQItemViewModel>(_FAQItemProvider.GetFAQItemsBySBU(sbu.DocumentGUID.ToString()));
            model.DocumentTypes = MapData<DocumentType, DocumentTypeViewModel>(_documentTypeProvider.GetDocumentTypes(SBUName, 12));
            model.ViewAllDocumentsLink = RouteHelper.GetSelectionFilterUrl(new SelectionFilterSearchRequest()
            {
                SolutionsIds = string.Join(",", _solutionProvider.GetSolutions(SBUName).Select(item => item.NodeID))
            });
                
            foreach (var item in model.DocumentTypes)
            {
                item.Documents = MapData<Document, DocumentViewModel>(_documentProvider.GetDocuments(item.Title));
            }
            //model.DocumentTypes.Add(_documentTypeProvider.GetDocumentTypes);
            /*foreach (var item in model.DocumentTypes)
            {
                item.Documents = item.Documents = MapData<Product, ProductViewModel>(_productProvider.GetDocuments(item.Title));
            }*/
            model.Solutions = MapData<Solution, TileViewModel>(_solutionProvider.GetSolutions(SBUName)).Where(w => !string.IsNullOrEmpty(w.HomeImage)).ToList();
            return View("~/Views/Afton/SBU/Index.cshtml", model);
        }
    }
}
