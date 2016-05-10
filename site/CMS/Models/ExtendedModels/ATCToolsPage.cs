using System.Collections.Generic;
using System;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class ATCToolsPage :IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("ATCTools");
                return (rt != null) ? rt.Route : "/ATCTools/Index";
            }
        }
    }
}