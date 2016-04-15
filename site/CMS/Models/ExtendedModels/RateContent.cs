using System.Linq;
using System;
using CMS.Mvc.Helpers;
using iTextSharp.text;

namespace CMS.DocumentEngine.Types
{
    public partial class RateContent
    {
        public DateTime Date
        {
            get
            {
                return UtilsHelper.ConvertToCST(GetDateTimeValue("DocumentCreatedWhen", default(DateTime)));
            }
        }
    }
}
