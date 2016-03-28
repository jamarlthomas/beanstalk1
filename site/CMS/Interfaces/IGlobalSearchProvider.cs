using CMS.DocumentEngine.Types;
using CMS.Mvc.Infrastructure.Models;

namespace CMS.Mvc.Interfaces
{
    public interface IGlobalSearchProvider
    {
        SearchResult PerformSearch(GlobalSearchRequest request);
    }
}
