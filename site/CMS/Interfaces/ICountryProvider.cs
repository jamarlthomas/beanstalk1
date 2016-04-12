using CMS.DocumentEngine.Types;
using CMS.Globalization;
using System;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ICountryProvider
    {
        IEnumerable<CountryInfo> GetCountries();
        CountryInfo GetCountryByGuid(Guid guid);
    }
}
