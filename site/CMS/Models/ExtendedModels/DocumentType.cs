using System.Globalization;
using CMS.Mvc.Helpers;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class DocumentType : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                return RouteHelper.GetSelectionFilterUrl(new SelectionFilterSearchRequest()
                {
                    DocumentTypesIds = this.NodeID.ToString(CultureInfo.InvariantCulture)
                });
            }
        }
    }
}