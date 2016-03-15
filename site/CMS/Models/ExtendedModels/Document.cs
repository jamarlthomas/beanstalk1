
namespace CMS.DocumentEngine.Types
{
    public partial class Document
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