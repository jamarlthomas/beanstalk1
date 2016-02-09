using System.Collections.Generic;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Interfaces
{
    public interface ILookupProvider
    {
        List<Region> GetRegions();
    }
}
