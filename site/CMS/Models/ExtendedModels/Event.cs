namespace CMS.DocumentEngine.Types
{
    public partial class Event
    {
        public override string DocumentNamePath
        {
            get
            {
                return string.Format("/Event/Index/{0}", this.NodeAlias);
            }
        }
    }
}