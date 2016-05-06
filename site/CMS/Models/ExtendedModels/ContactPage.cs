using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class ContactPage : IRoutedModel
    {
        public static string RoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("ContactPage");
                return (rt != null) ? rt.Route: "/Contact/Index";
            }
        }

        public string DocumentRoutePath
        {
            get
            {
                return RoutePath;
                
            }
        }
    }
}