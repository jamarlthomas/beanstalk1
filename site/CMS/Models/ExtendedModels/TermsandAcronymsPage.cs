using System;
using System.Collections.Generic;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class TermsAndAcronymsPage : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("TermsAndAcronyms");
                return (rt != null) ? rt.Route : "/TermsAndAcronyms/Index";
            }
        }
    }
}