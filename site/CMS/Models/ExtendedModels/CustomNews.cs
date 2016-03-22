namespace CMS.DocumentEngine.Types
{
    public partial class CustomNews
    {
        public override string DocumentUrlPath
        {
            get
            {
                return string.Format("/Document/Index/{0}", this.NodeAlias);
            }
        }
    }
}