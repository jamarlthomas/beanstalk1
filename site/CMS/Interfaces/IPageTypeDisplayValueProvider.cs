using CMS.DocumentEngine.Types;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IPageTypeDisplayValueProvider
    {
        PageTypeDisplayValue GetDisplayValue(string alias);
    }
}
