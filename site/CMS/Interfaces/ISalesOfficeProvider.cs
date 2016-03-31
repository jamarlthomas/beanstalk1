using CMS.DocumentEngine.Types;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ISalesOfficeProvider
    {
        List<SalesOffice> GetSalesOffices(string parentName);
        SalesOffice GetPrimarySalesOffice(string parentName);
    }
}
