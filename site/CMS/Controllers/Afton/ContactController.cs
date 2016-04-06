using CMS.Globalization;
using CMS.Mvc.Infrastructure.Models;
using CMS.OnlineMarketing;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Contact;
using CMS.Mvc.ViewModels.Shared;
using System.Linq;
using System.Web.Mvc;
using System;

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
        
        public ContactController()
        {
            _contactPageProvider = new ContactPageProvider();
            _regionProvider = new RegionProvider();
            _countryProvider = new CountryProvider();
            _salesOfficeProvider = new SalesOfficeProvider();
            _treeNodesProvider = new TreeNodesProvider();
            _genericPageProvider = new GenericPageProvider();
            _contactProvider = new ContactProvider();
        }

        public ContactController(IContactPageProvider contactPageProvider,
            IRegionProvider regionProvider,
            ICountryProvider countryProvider,
            ISalesOfficeProvider salesOfficeProvider,
            ITreeNodesProvider treeNodesProvider,
            IGenericPageProvider genericPageProvider,
            IContactProvider contactProvider)
        {
            _contactPageProvider = contactPageProvider;
            _regionProvider = regionProvider;
            _countryProvider = countryProvider;
            _salesOfficeProvider = salesOfficeProvider;
            _treeNodesProvider = treeNodesProvider;
            _genericPageProvider = genericPageProvider;
            _contactProvider = contactProvider;
        }

        [HttpGet]
        public ActionResult Index(bool showPrompt = false)
        {
            var page = _contactPageProvider.GetContactPage();
            var viewModel = MapData<ContactPage, ContactPageViewModel>(page);
            if (!showPrompt)
            {
                viewModel.PromptLabel = string.Empty;
            }

            var privacyStatement = _genericPageProvider.GetChildGenericPages(page.NodeAlias).First();
            viewModel.NewsletterPrivacyLabel = privacyStatement.Title;
            viewModel.NewsletterPrivacyLink = privacyStatement.DocumentNamePath;
            OnlineMarketingContext.GetCurrentContact();
            viewModel.EmergencyResponse = MapData<ContactPage, EmergencyResponseViewModel>(page);
            viewModel.Countries = MapData<CountryInfo, ContactCountryViewModel>(_countryProvider.GetCountries());

            viewModel.Regions = _regionProvider.GetRegions().Select(region =>
            {
                var primarySalesOffice = _salesOfficeProvider.GetPrimarySalesOffice(region.NodeAlias);
                var regionViewModel = MapData<SalesOffice, ContactRegionViewModel>(primarySalesOffice);
                var officeCountry = _countryProvider.GetCountryByGuid(Guid.Parse(primarySalesOffice.Country));
                regionViewModel.CountryName = officeCountry.CountryDisplayName;
                regionViewModel.Title = region.Title;
                regionViewModel.DocumentNamePath = region.DocumentNamePath;
                regionViewModel.MapImage = region.MapImage;
                return regionViewModel;
            }).ToList();
            return View("~/Views/Afton/Contact/Index.cshtml", viewModel);
        }

        [HttpPost]
        public ActionResult Index(UpdateContactRequest request)
        {
            _contactProvider.UpdateCurrentContact(request);
            return Index(true);
        }
    }
}