using CMS.Mvc.Helpers;

namespace CMS.DocumentEngine.Types
{
    public partial class ContactPage
    {
        public static string DocumentNamePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("ContactPage");
                return (rt != null) ? rt.Route: "/Contact/Index";
            }
        }
    }
}