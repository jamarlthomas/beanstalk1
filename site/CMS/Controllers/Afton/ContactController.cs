using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Contact;
using CMS.Mvc.ViewModels.Shared;
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
        
        public ContactController()
        {
            _contactPageProvider = new ContactPageProvider();
            _regionProvider = new RegionProvider();
            _countryProvider = new CountryProvider();
            _salesOfficeProvider = new SalesOfficeProvider();
            _treeNodesProvider = new TreeNodesProvider();
            _genericPageProvider = new GenericPageProvider();;
        }

        public ContactController(IContactPageProvider contactPageProvider,
            IRegionProvider regionProvider,
            ICountryProvider countryProvider,
            ISalesOfficeProvider salesOfficeProvider,
            ITreeNodesProvider treeNodesProvider,
            IGenericPageProvider genericPageProvider)
        {
            _contactPageProvider = contactPageProvider;
            _regionProvider = regionProvider;
            _countryProvider = countryProvider;
            _salesOfficeProvider = salesOfficeProvider;
            _treeNodesProvider = treeNodesProvider;
            _genericPageProvider = genericPageProvider;
        }

        public ActionResult Index()
        {
            var page = _contactPageProvider.GetContactPage();
            var viewModel = MapData<ContactPage, ContactPageViewModel>(page);

            var privacyStatement = _genericPageProvider.GetChildGenericPages(page.NodeAlias).First();
            viewModel.NewsletterPrivacyLabel = privacyStatement.Title;
            viewModel.NewsletterPrivacyLink = privacyStatement.DocumentNamePath;

            viewModel.EmergencyResponse = MapData<ContactPage, EmergencyResponseViewModel>(page);
            viewModel.Countries = MapData<Country, ContactCountryViewModel>(_countryProvider.GetCountries());

            viewModel.Regions = _regionProvider.GetRegions().Select(region =>
            {
                var primarySalesOffice = _salesOfficeProvider.GetPrimarySalesOffice(region.NodeAlias);
                var regionViewModel = MapData<SalesOffice, ContactRegionViewModel>(primarySalesOffice);
                var officeCountry = _treeNodesProvider.GetTreeNodes(primarySalesOffice.Country).First();
                regionViewModel.CountryName = officeCountry.GetStringValue("Name", officeCountry.NodeName);
                regionViewModel.Title = region.Title;
                regionViewModel.DocumentNamePath = region.DocumentNamePath;
                regionViewModel.MapImage = region.MapImage;
                return regionViewModel;
            }).ToList();
            return View("~/Views/Afton/Contact/Index.cshtml", viewModel);
        }
    }
}