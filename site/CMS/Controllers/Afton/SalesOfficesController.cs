using CMS.Mvc.ActionFilters;
using CMS.DocumentEngine;
using CMS.DataEngine;
using CMS.Membership;
using CMS.Localization;
using CMS.DocumentEngine.Types;
using CMS.Globalization;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.SalesOffices;
using CMS.Mvc.ViewModels.Shared;
using System;
using System.Linq;
using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class SalesOfficesController : BaseController
    {
        private readonly IRegionProvider _regionProvider;
        private readonly ISalesOfficeProvider _salesOfficeProvider;
        private readonly ICountryProvider _countryProvider;
        private readonly IRegionConstantsProvider _regionConstantsProvider;

        public SalesOfficesController()
        {
            _regionProvider = new RegionProvider();
            _salesOfficeProvider = new SalesOfficeProvider();
            _countryProvider = new CountryProvider();
            _regionConstantsProvider = new RegionConstantsProvider();
        }

        public SalesOfficesController(IRegionProvider regionProvider,
            ISalesOfficeProvider salesOfficeProvider,
            ICountryProvider countryProvider,
            IRegionConstantsProvider regionConstantsProvider)
        {
            _regionProvider = regionProvider;
            _salesOfficeProvider = salesOfficeProvider;
            _countryProvider = countryProvider;
            _regionConstantsProvider = regionConstantsProvider;
        }

        [PageVisitActivity]
        public ActionResult Index(string RegionName)
        {
            var region = _regionProvider.GetRegion(RegionName);
            if ( !region.IsPublished )
            {
                if ( DocumentSecurityHelper.IsAuthorizedPerDocument( region, NodePermissionsEnum.Read, true, LocalizationContext.CurrentCulture.CultureCode, MembershipContext.AuthenticatedUser ) != AuthorizationResultEnum.Allowed )
                {
                    return Redirect( "~/cmspages/logon.aspx" + "?ReturnUrl=" + Request.Path );
                }
            }
            var model = MapData<Region, ViewModels.SalesOffices.RegionViewModel>(region);
            var regionConstants = _regionConstantsProvider.GetRegionConstants();
            model.EmergencyResponse = MapData<RegionConstants, EmergencyResponseViewModel>(regionConstants);
            model.Offices = _salesOfficeProvider.GetSalesOffices(RegionName).Select(office => {
                var officeViewModel = MapData<SalesOffice, SalesOfficeViewModel>(office);
                officeViewModel.CountryName = _countryProvider.GetCountryByGuid(Guid.Parse(office.Country)).CountryDisplayName;
                officeViewModel.PhoneLabel = regionConstants.PhoneLabel;
                officeViewModel.ServingCountriesLabel = regionConstants.ServingCountriesLabel;
                officeViewModel.ServingCountriesList = MapData<CountryInfo, CountryViewModel>(_countryProvider.GetCountries(office.ServingCountries));
                return officeViewModel;
            }).ToList();
            return View("~/Views/Afton/SalesOffices/Index.cshtml", model);
        }
    }
}