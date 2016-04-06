using System;
using System.Collections.Generic;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Globalization;

namespace CMS.Mvc.Providers
{
    public class CountryProvider : ICountryProvider
    {
        public IEnumerable<CountryInfo> GetCountries()
        {
            return CountryInfoProvider.GetAllCountries();
        }

        public CountryInfo GetCountryByGuid(Guid guid)
        {
            return (CountryInfo)CountryInfoProvider.GetInfoByGuid(CountryInfo.OBJECT_TYPE, guid);
        }
    }
}