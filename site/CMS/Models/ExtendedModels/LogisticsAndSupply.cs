using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class LogisticsAndSupply : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("Logistics and Supply Child");
                return (rt != null)
                    ? rt.Route.Replace("{ChildPageName}", this.NodeAlias)
                    : string.Format("Logistics-and-Supply/{0}", this.NodeAlias);
            }
        }
    }
}