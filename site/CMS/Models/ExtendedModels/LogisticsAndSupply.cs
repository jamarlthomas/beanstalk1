using CMS.Mvc.Helpers;

namespace CMS.DocumentEngine.Types
{
    public partial class LogisticsAndSupply
    {
        public override string DocumentNamePath
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