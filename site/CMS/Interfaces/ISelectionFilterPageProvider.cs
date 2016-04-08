using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface ISelectionFilterPageProvider
    {
        SelectionFilterPage GetSelectionFilterPage(string name);
        SelectionFilterPage GetDefaultSelectionFilterPage();
        SelectionFilterPage GetChildSelectionFilterPage(string parentName);
    }
}
