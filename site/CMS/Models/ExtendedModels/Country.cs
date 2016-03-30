namespace CMS.DocumentEngine.Types
{
    public partial class Country
    {
        public string Name
        {
            get
            {
                return GetStringValue("Name", NodeName);
            }
        }
    }
}