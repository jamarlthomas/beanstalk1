using System;
using System.Linq;
using System.Collections.Generic;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class SalesOfficeProvider : ISalesOfficeProvider
    {
        public List<SalesOffice> GetSalesOffices(string parentName)
        {
            return ContentHelper.GetDocChildrenByName<SalesOffice>(SalesOffice.CLASS_NAME, parentName);
        }

        public SalesOffice GetPrimarySalesOffice(string parentName)
        {
            return GetSalesOffices(parentName).First();
        }
    }
}