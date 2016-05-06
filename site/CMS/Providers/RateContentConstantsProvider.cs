using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class RateContentConstantsProvider : IRateContentConstantsProvider
    {
        public RateContentConstants GetRateContentConstants()
        {
            return ContentHelper.GetDoc<RateContentConstants>(RateContentConstants.CLASS_NAME);
        }
    }
}