namespace CMS.DocumentEngine.Types
{
    public partial class NewsAndEventsPage
    {
        public override string DocumentNamePath
        {
            get
            {
                return string.Format("/NewsAndEvents/Index/{0}", this.NodeAlias);
            }
        }
    }
}