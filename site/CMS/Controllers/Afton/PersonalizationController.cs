using System.Web.Mvc;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Shared.Personalization;

namespace CMS.Mvc.Controllers.Afton
{
    public class PersonalizationController : BaseController
    {
        private readonly IPersonalizationProvider _personalizationProvider;

        public PersonalizationController(IPersonalizationProvider personalizationProvider)
        {
            _personalizationProvider = personalizationProvider;
        }
        public PersonalizationController()
        {
            _personalizationProvider = new PersonalizationProvider();
        }

        public ActionResult GetPeronalizedCards()
        {
            PersonalizationSectionViewModel model = new PersonalizationSectionViewModel();
            model.Title = _personalizationProvider.GetSectionTitle();
            var items = _personalizationProvider.GetPersonalizedItems();
            model.Cards = MapData<PersonalizedTile, PersonalizationCardViewModel>(items);
            return View("~/Views/Afton/Shared/Personalization/_personalizationSection.cshtml", model);
        }
    }
}