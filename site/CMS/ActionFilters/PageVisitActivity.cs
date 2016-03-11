namespace CMS.Mvc.ActionFilters
{
    public class PageVisitActivity : BaseActivityFilter
    {
        protected override string ActivityType
        {
            get { return "pagevisit"; }
        }
        protected override string ActivityTitleTemplate
        {
            get { return "Document with Id {0} was viewed"; }
        }
    }
}