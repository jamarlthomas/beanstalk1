namespace CMS.DocumentEngine.Types
{
    public partial class Event
    {
        public override string DocumentNamePath
        {
            get
            {
                return this.GetStringValue("URL","");
            }
        }
    }
}