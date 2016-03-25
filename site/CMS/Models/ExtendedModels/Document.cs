namespace CMS.DocumentEngine.Types
{
    public partial class Document
    {
        public override string DocumentNamePath
        {
            get
            {
                return string.Format("/Document/Index/{0}", this.NodeAlias);
            }
        }
    }
}