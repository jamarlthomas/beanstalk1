using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class Privacyconstants : IRoutedModel
    {
        public static string RoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("PrivacyConstants");
                return (rt != null) ? rt.Route : "/Privacy-Terms";
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