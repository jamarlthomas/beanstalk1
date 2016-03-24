using System.Collections.Generic;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Interfaces
{
    public interface IPersonalisationProvider
    {
        List<PersonalizedTile> GetPersonalizedItems();
    }
}
