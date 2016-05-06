using CMS.Mvc.Helpers;

namespace CMS.DocumentEngine.Types
{
    public partial class LogisticsAndSupplyFolder
    {
        public override string DocumentNamePath
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