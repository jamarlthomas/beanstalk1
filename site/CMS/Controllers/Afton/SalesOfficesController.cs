﻿using System.Diagnostics;
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

        public ActionResult Index(string name)
        {
            var sw = new Stopwatch();
            sw.Start();
            var region = _regionProvider.GetRegion(name);
            var model = MapData<Region, ViewModels.SalesOffices.RegionViewModel>(region);
            var regionConstants = _regionConstantsProvider.GetRegionConstants();
            model.EmergencyResponse = MapData<RegionConstants, EmergencyResponseViewModel>(regionConstants);
            model.Offices = _salesOfficeProvider.GetSalesOffices(name).Select(office => {
                var officeViewModel = MapData<SalesOffice, SalesOfficeViewModel>(office);
                officeViewModel.CountryName = _countryProvider.GetCountryByGuid(Guid.Parse(office.Country)).CountryDisplayName;
                officeViewModel.PhoneLabel = regionConstants.PhoneLabel;
                officeViewModel.ServingCountriesLabel = regionConstants.ServingCountriesLabel;
                officeViewModel.ServingCountriesList = MapData<CountryInfo, CountryViewModel>(_countryProvider.GetCountries(UtilsHelper.ParseGuids(office.ServingCountries)));
                return officeViewModel;
            }).ToList();
            var dataTime = sw.ElapsedMilliseconds;
            sw.Restart();
            var view = View("~/Views/Afton/SalesOffices/Index.cshtml", model);
            var viewTime = sw.ElapsedMilliseconds;
            return view;
        }
    }
}