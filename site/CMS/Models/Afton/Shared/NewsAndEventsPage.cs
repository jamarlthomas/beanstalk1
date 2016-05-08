using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class NewsAndEventsPage: IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("NewsAndEvents");
                return (rt != null) ? rt.Route : "/NewsAndEvents";
            }
        }
    }
}