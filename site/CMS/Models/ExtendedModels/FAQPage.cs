using System;
using System.Collections.Generic;
using System;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class FAQPage : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("FAQ");
                return (rt != null) ? rt.Route : "/FAQPage/Index";
            }
        }
    }
}