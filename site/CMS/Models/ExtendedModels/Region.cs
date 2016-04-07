namespace CMS.DocumentEngine.Types
{
    public partial class Region
    {
        public override string DocumentNamePath
        {
            get
            {
                return string.Format("/SalesOffices/Index/{0}", this.NodeAlias);
            }
        }
    }
}
