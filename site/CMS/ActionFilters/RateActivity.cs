namespace CMS.Mvc.ActionFilters
{
    public class RateActivity : BaseActivityFilter
    {
        protected override string ActivityType
        {
            get { return "rate"; }
        }
        protected override string ActivityTitleTemplate
        {
            get { return "Document with Id {0} was rated"; }
        }
    }
}