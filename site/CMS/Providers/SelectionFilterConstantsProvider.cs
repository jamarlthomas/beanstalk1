using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Linq;

namespace CMS.Mvc.Providers
{
    public class SelectionFilterConstantsProvider : ISelectionFilterConstantsProvider
    {
        public SelectionFilterConstants GetSelectionFilterConstants()
        {
            return ContentHelper.GetDocs<SelectionFilterConstants>(SelectionFilterConstants.CLASS_NAME).FirstOrDefault();
        }
    }
}