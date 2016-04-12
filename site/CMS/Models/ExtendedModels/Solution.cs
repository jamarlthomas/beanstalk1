namespace CMS.DocumentEngine.Types
{
    public partial class Solution
    {
        public override string DocumentNamePath
        {
            get
            {
                return string.Format("/Solution/Index/{0}", this.NodeAlias);
            }
        }
    }
}