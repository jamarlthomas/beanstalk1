using System.Web.Mvc;

namespace CMS.Mvc.Controllers.Afton
{
    public class LogisticsAndSupplyController : GenericController
    {
        public ActionResult Landing(string childPageName)
        {
            if (string.IsNullOrWhiteSpace(childPageName))
                childPageName = "Logistics and Supply";

            return base.Index(childPageName);
        }
    }
}