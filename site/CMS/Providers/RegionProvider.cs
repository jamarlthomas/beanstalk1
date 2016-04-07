using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace CMS.Mvc.Providers
{
    public class RegionProvider : IRegionProvider
    {
        public List<Region> GetRegions()
        {
            return ContentHelper.GetDocs<Region>(Region.CLASS_NAME);
        }

        public Region GetRegion(string alias)
        {
            return ContentHelper.GetDocByName<Region>(Region.CLASS_NAME, alias);
        }
    }
}