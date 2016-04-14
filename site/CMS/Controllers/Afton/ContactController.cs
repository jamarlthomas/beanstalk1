using CMS.Globalization;
using CMS.Mvc.Infrastructure.Models;
<<<<<<< Temporary merge branch 1
=======
using CMS.OnlineMarketing;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
>>>>>>> Temporary merge branch 2
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Contact;
using CMS.Mvc.ViewModels.Shared;
using System;
using System.Linq;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class ContactController : BaseController
    {
        private readonly IContactPageProvider _contactPageProvider;
        private readonly IRegionProvider _regionProvider;
        private readonly ICountryProvider _countryProvider;
        private readonly ISalesOfficeProvider _salesOfficeProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;
        private readonly IGenericPageProvider _genericPageProvider;
        private readonly IContactProvider _contactProvider;
        private readonly IRegionConstantsProvider _regionConstantsProvider;
        private readonly IEmailProvider _emailProvider;
=======
>>>>>>> Temporary merge branch 2

        public ContactController()
        {
            _contactPageProvider = new ContactPageProvider();
            _regionProvider = new RegionProvider();
            _countryProvider = new CountryProvider();
            _salesOfficeProvider = new SalesOfficeProvider();
            _treeNodesProvider = new TreeNodesProvider();
            _genericPageProvider = new GenericPageProvider();
            _contactProvider = new ContactProvider();
            _regionConstantsProvider = new RegionConstantsProvider();
            _emailProvider = new EmailProvider();
        }

        public ContactController(IContactPageProvider contactPageProvider,
            IRegionProvider regionProvider,
            ICountryProvider countryProvider,
            ISalesOfficeProvider salesOfficeProvider,
            ITreeNodesProvider treeNodesProvider,
            IGenericPageProvider genericPageProvider,
            IContactProvider contactProvider,
            IRegionConstantsProvider regionConstantsProvider,
            IEmailProvider emailProvider)
        {
            _contactPageProvider = contactPageProvider;
            _regionProvider = regionProvider;
            _countryProvider = countryProvider;
            _salesOfficeProvider = salesOfficeProvider;
            _treeNodesProvider = treeNodesProvider;
            _genericPageProvider = genericPageProvider;
            _contactProvider = contactProvider;
            _regionConstantsProvider = regionConstantsProvider;
            _emailProvider = emailProvider;
        }

        [HttpGet]
        [PageVisitActivity]
        public ActionResult Index(bool showSubmitSuccesied = false)
        {
            var page = _contactPageProvider.GetContactPage();

            var viewModel = MapData<ContactPage, ContactPageViewModel>(page);

            var privacyStatement = _genericPageProvider.GetFirstChildGenericPage(page.NodeAlias);
            viewModel.NewsletterPrivacyLabel = privacyStatement.Title;
            viewModel.NewsletterPrivacyLink = privacyStatement.DocumentNamePath;
            OnlineMarketingContext.GetCurrentContact();
	    viewModel.EmergencyResponse = MapData<RegionConstants, EmergencyResponseViewModel>(_regionConstantsProvider.GetRegionConstants());
            viewModel.Countries = MapData<CountryInfo, ContactCountryViewModel>(_countryProvider.GetCountries());

            viewModel.Regions = _regionProvider.GetRegions().Select(MapRegionToRegionViewModel).ToList();

            return View("~/Views/Afton/Contact/Index.cshtml", viewModel);
        }

        [HttpPost]
        public ActionResult Index(UpdateContactRequest request)
        {
            _contactProvider.UpdateCurrentContact(request);

            SendEmail(request);

            return Index(true);
        }

        private void SendEmail(UpdateContactRequest request)
        {
            var country = _countryProvider.GetCountryById(request.CountryId);
            var countryGuid = country.CountryGUID;
            var salesOffice = _salesOfficeProvider.GetSalesOfficeByCountryGuid(countryGuid);
            string email;

            if (salesOffice != null)
            {
                email = (salesOffice.Parent as Region).Email;
            }
            else
            {
                var defaultEmailRegion = _treeNodesProvider.GetTreeNodes(_regionConstantsProvider.GetRegionConstants().DefaultEmailRegion).First() as Region;
                email = defaultEmailRegion.Email;
            }

            request.CountryName = country.CountryDisplayName;
            _emailProvider.NotifyContactChanged(request, email);
        }

        private ContactRegionViewModel MapRegionToRegionViewModel(Region region)
        {
            var primarySalesOffice = _salesOfficeProvider.GetPrimarySalesOffice(region.NodeAlias);
            var regionViewModel = MapData<SalesOffice, ContactRegionViewModel>(primarySalesOffice);
            var officeCountry = _countryProvider.GetCountryByGuid(Guid.Parse(primarySalesOffice.Country));
            regionViewModel.CountryName = officeCountry.CountryDisplayName;
            regionViewModel.Title = region.Title;
            regionViewModel.DocumentNamePath = region.DocumentNamePath;
            regionViewModel.MapImage = region.MapImage;
            return regionViewModel;
        }
    }
}
