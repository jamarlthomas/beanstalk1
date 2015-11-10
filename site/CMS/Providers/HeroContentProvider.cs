using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class HeroContentProvider : IHeroContentProvider
    {
        public List<HeroContent> GetHeroContentItems()
        {
            return ContentHelper.GetDocs<HeroContent>(HeroContent.CLASS_NAME);
        }
    }
}