using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class FooterCareersProvider : IFooterCareersProvider
    {
        public List<FooterCareers> GetFooterCareersItems()
        {
            return ContentHelper.GetDocs<FooterCareers>(FooterCareers.CLASS_NAME);
        }
    }
}