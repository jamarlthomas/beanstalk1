using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IFooterNavCategoryProvider
    {
        List<FooterNavCategory> GetFooterNavCategoryItems();
    }
}
