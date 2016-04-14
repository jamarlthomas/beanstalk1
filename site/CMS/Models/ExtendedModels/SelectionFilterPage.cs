namespace CMS.DocumentEngine.Types
{
    public partial class SelectionFilterPage
    {
        public override string DocumentNamePath
        {
            get
            {
                return string.Format("/SelectionFilter/Index/{0}", this.NodeAlias);
            }
        }
    }
}