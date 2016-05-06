using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class LogisticsAndSupplyFolder : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("Logistics and Supply");
                return (rt != null)
                    ? rt.Route
                    : "Logistics-and-Supply";
            }
        }
    }
}