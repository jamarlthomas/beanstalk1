using System.Linq;
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
            return ContentHelper.GetCountries();
        }

        public CountryInfo GetCountryByGuid(Guid guid)
        {
            return ContentHelper.GetCountryByGuid(guid);
        }

        public CountryInfo GetCountryById(int id)
        {
            return ContentHelper.GetCountryById(id);
        }

        public IEnumerable<CountryInfo> GetCountries(List<Guid> guids)
        {
            return guids.Select(GetCountryByGuid).Where(w => w != null);
        }

        public IEnumerable<CountryInfo> GetCountries(string guids)
        {
            return GetCountries(UtilsHelper.ParseGuids(guids));
        }
    }
}