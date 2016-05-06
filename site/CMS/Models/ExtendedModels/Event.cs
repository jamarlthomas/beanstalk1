using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class Event : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                return string.Format("/Event/Index/{0}", this.NodeAlias);
            }
        }
    }
}