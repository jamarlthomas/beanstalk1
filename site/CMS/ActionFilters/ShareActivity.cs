namespace CMS.Mvc.ActionFilters
{
    public class ShareActivity : BaseActivityFilter
    {
        protected override string ActivityType
        {
            get { return "share"; }
        }
        protected override string ActivityTitleTemplate
        {
            get { return "Document with Id {0} was shared"; } 
        }
    }
}