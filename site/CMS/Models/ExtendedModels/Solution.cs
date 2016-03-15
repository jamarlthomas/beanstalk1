
namespace CMS.DocumentEngine.Types
{
    public partial class Solution
    {
        public override string DocumentUrlPath
        {
            get
            {
                return string.Format("/Solution/Index/{0}/{1}", this.NodeAlias, this.Parent != null ? this.Parent.NodeAlias : string.Empty);
            }
        }
    }
}