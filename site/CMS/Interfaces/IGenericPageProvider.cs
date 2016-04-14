using System.Collections.Generic;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Interfaces
{
    public interface IGenericPageProvider
    {
        List<GenericPage> GetChildGenericPages(string alias);
        GenericPage GetFirstChildGenericPage(string alias);
    }
}
