namespace CMS.DocumentEngine.Types
{
    public partial class Product
    {
        public override string DocumentNamePath
        {
            get
            {
                return string.Format("/Product/Index/{0}", this.NodeAlias);
            }
        }
    }
}