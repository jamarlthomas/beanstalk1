namespace CMS.DocumentEngine.Types
{
    public partial class BlogPost
    {
        public override string DocumentNamePath
        {
            get
            {
                return string.Format("/Document/Index/{0}", this.NodeAlias);
            }
        }

        public string Category
        {
            get
            {
                return (Parent as BlogCategory ?? Parent.Parent as BlogCategory).Title;
            }
        }

        public int DocumentCreatedByUserID
        {
            get
            {
                return GetIntegerValue("DocumentCreatedByUserID", default(int));
            }
        }
    }
}
