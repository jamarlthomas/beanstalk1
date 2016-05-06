using System;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class RateContent : IRoutedModel
    {
        public DateTime Date
        {
            get
            {
                return UtilsHelper.ConvertToCST(GetDateTimeValue("DocumentCreatedWhen", default(DateTime)));
            }
        }

        public string DocumentRoutePath
        {
            get
            {
                return DocumentNamePath;
            }
        }
    }
}
