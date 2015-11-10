using CMS.DocumentEngine.Types;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IHeroContentProvider
    {
        List<HeroContent> GetHeroContentItems();
    }
}
