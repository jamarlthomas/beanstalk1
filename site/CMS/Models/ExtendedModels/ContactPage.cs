using CMS.Mvc.Helpers;

namespace CMS.DocumentEngine.Types
{
    public partial class ContactPage
    {
        public static string RoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("ContactPage");
                return (rt != null) ? rt.Route: "/Contact/Index";
            }
        }

        public override string DocumentNamePath
        {
            get
            {
                return RoutePath;
                
            }
        }
    }
}