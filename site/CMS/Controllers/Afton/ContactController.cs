using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Contact;
using CMS.Mvc.ViewModels.Shared;
using System.Linq;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class ContactController : SidebarPageController
    {
        private readonly IContactPageProvider _contactPageProvider;
        private readonly IRegionProvider _regionProvider;
        private readonly ICountryProvider _countryProvider;
        private readonly ISalesOfficeProvider _salesOfficeProvider;
        private readonly ITreeNodesProvider _treeNodesProvider;
        
        public ContactController()
        {
            _contactPageProvider = new ContactPageProvider();
            _regionProvider = new RegionProvider();
            _countryProvider = new CountryProvider();
            _salesOfficeProvider = new SalesOfficeProvider();
            _treeNodesProvider = new TreeNodesProvider();
        }

        public ContactController(IContactPageProvider contactPageProvider,
            IRegionProvider regionProvider,
            ICountryProvider countryProvider,
            ISalesOfficeProvider salesOfficeProvider,
            ITreeNodesProvider treeNodesProvider)
        {
            _contactPageProvider = contactPageProvider;
            _regionProvider = regionProvider;
            _countryProvider = countryProvider;
            _salesOfficeProvider = salesOfficeProvider;
            _treeNodesProvider = treeNodesProvider;
        }
        [PageVisitActivity]
        public ActionResult Index(string name)
        {
            var page = _contactPageProvider.GetContactPage();
            var viewModel = MapData<ContactPage, ContactPageViewModel>(page);
            viewModel.BreadCrumb = new BreadCrumbViewModel
            {
                BreadcrumbLinkItems = _treeNodesProvider.GetBreadcrumb(page.DocumentGUID)
            };

            viewModel.EmergencyResponse = MapData<ContactPage, EmergencyResponseViewModel>(page);
            viewModel.Countries = MapData<Country, ContactCountryViewModel>(_countryProvider.GetCountries());

            viewModel.Regions = _regionProvider.GetRegions().Select(region =>
            {
                var primarySalesOffice = _salesOfficeProvider.GetPrimarySalesOffice(region.NodeName);
                var regionViewModel = MapData<SalesOffice, ContactRegionViewModel>(primarySalesOffice);
                regionViewModel.CountryName = _treeNodesProvider.GetTreeNodes(primarySalesOffice.Country).First().NodeName;
                regionViewModel.Title = region.Title;
                return regionViewModel;
            }).ToList();
            return View("~/Views/Afton/Contact/Index.cshtml", viewModel);
        }
    }
}