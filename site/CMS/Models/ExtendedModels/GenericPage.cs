namespace CMS.DocumentEngine.Types
{
    public partial class GenericPage
    {
        public override string DocumentNamePath
        {
            get
            {
                return string.Format("/GenericPage/Index/{0}", this.NodeAlias);
            }
        }
    }
}