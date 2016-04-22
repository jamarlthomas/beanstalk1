using System.Web.Mvc;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Controllers.Afton
{
    public class LogisticsAndSupplyController : GenericBaseController<LogisticsAndSupply>
    {
        public override ActionResult Index(string childPageName)
        {
            return base.Index(childPageName);
        }
    }
}