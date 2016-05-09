using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class SelectionFilterPage : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                return string.Format("/SelectionFilter/Index/{0}", this.NodeAlias);
            }
        }
    }
}