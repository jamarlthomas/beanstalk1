using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class RateContentFolderProvider : IRateContentFolderProvider
    {
        public RateThisContentFolder GetRateContentFolder()
        {
            return ContentHelper.GetDoc<RateThisContentFolder>(RateThisContentFolder.CLASS_NAME);
        }
    }
}
