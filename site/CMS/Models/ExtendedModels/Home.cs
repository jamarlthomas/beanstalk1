using CMS.Mvc.Helpers;

namespace CMS.DocumentEngine.Types
{
    public partial class Home
    {
        public override string DocumentNamePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("Home");
                return (rt != null) ? rt.Route : string.Empty;
            }
        }
    }
}
