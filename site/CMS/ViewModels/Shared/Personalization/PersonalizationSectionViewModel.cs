using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.Shared.Personalization
{
    public class PersonalizationSectionViewModel
    {
        public string Title { get; set; }
        public List<PersonalizationCardViewModel> Cards { get; set; }
    }
}
