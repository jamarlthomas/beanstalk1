using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class FooterAboutProvider : IFooterAboutProvider
    {
        public List<FooterAbout> GetFooterAboutItems()
        {
            return ContentHelper.GetDocs<FooterAbout>(FooterAbout.CLASS_NAME);
        }
    }
}