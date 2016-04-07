using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Linq;

namespace CMS.Mvc.Providers
{
    public class RegionConstantsProvider : IRegionConstantsProvider
    {
        public RegionConstants GetRegionConstants()
        {
            return ContentHelper.GetDocs<RegionConstants>(RegionConstants.CLASS_NAME).FirstOrDefault();
        }
    }
}