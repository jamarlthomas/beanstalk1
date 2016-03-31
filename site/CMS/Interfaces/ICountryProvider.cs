using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ICountryProvider
    {
        List<Country> GetCountries();
    }
}
