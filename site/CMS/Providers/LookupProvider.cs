using System.Collections.Generic;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class LookupProvider : ILookupProvider
    {
        public List<Region> GetRegions()
        {
            return ContentHelper.GetDocs<Region>(Region.CLASS_NAME);
        }
    }
}
