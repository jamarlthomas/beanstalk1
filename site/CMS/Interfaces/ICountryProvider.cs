using CMS.DocumentEngine.Types;
using CMS.Globalization;
using System;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ICountryProvider
    {
        IEnumerable<CountryInfo> GetCountries();
        IEnumerable<CountryInfo> GetCountries(List<Guid> guids);
        IEnumerable<CountryInfo> GetCountries(string guids);
        CountryInfo GetCountryByGuid(Guid guid);
        CountryInfo GetCountryById(int id);
    }
}
