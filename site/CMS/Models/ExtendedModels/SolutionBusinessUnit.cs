namespace CMS.DocumentEngine.Types
{
    public partial class SolutionBusinessUnit
    {
        public override string DocumentNamePath
        {
            get
            {
                return string.Format("/SBU/Index/{0}", this.NodeAlias);
            }
        }
    }
}
