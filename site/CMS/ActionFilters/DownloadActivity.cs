namespace CMS.Mvc.ActionFilters
{
    public class DownloadActivity : BaseActivityFilter
    {
        protected override string ActivityType
        {
            get { return "download"; }
        }
        protected override string ActivityTitleTemplate
        {
            get { return "Document with Id {0} was downloaded"; } 
        }
    }
}