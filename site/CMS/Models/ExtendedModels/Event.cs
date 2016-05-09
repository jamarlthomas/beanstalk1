using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class Event : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                return this.GetStringValue("URL","");
            }
        }
    }
}