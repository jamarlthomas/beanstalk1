using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IRegionProvider
    {
        List<Region> GetRegions();
        Region GetRegion(string alias);
    }
}
