using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Infrastructure.Models;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface INewsAndEventsPageProvier
    {
        NewsAndEventsPage GetNewsAndEventsPage();
        IEnumerable<TreeNode> GetContentList(NewsAndEventsPage page, NewsAndEventsRequest request);
        List<string> GetDocumentTypes(NewsAndEventsPage page, string category);
    }
}
