using System.Web.Mvc;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;

namespace CMS.Mvc.Controllers.Afton
{
    public class LogisticsAndSupplyController : GenericBaseController<LogisticsAndSupply>
    {
        [PageVisitActivity]
        public override ActionResult Index(string childPageName)
        {

            return base.Index(childPageName);
        }
    }
}