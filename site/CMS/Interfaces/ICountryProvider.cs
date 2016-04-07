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
        CountryInfo GetCountryByGuid(Guid guid);
    }
}
