using System.Web.Mvc;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;

namespace CMS.Mvc.Controllers.Afton
{
    public class TermsPageController : GenericBaseController<TermsPage>
    {

        public override ActionResult Index(string childPageName)
        {

            return base.Index(childPageName);
        }
    }
}