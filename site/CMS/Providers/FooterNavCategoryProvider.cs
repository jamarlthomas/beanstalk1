using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class FooterNavCategoryProvider : IFooterNavCategoryProvider
    {
        public List<FooterNavCategory> GetFooterNavCategoryItems()
        {
            return ContentHelper.GetDocs<FooterNavCategory>(FooterNavCategory.CLASS_NAME);
        }
    }
}