using CMS.Mvc.Helpers;
namespace CMS.DocumentEngine.Types
{
    public partial class NewsAndEventsPage
    {
        public override string DocumentNamePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("NewsAndEvents");
                return (rt != null) ? rt.Route : "/NewsAndEvents";
            }
        }
    }
}