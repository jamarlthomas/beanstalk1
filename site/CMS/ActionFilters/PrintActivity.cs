namespace CMS.Mvc.ActionFilters
{
    public class PrintActivity : BaseActivityFilter
    {
        protected override string ActivityType
        {
            get { return "print"; }
        }
        protected override string ActivityTitleTemplate
        {
            get { return "Document with Id {0} was printed"; }
        }
    }
}