using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
	public interface ISelectionFilterSearchProvider
    {
		SearchResult PerformSearch(SelectionFilterSearchRequest request);
    }
}
