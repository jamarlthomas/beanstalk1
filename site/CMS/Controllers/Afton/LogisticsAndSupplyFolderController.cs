using System.Web.Mvc;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;

namespace CMS.Mvc.Controllers.Afton
{
    public class LogisticsAndSupplyFolderController : GenericBaseController<LogisticsAndSupplyFolder>
    {
        [PageVisitActivity]
        public override ActionResult Index(string childPageName)
        {

            return base.Index(childPageName);
        }
      
    }
}