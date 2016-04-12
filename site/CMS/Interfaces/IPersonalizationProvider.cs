using System.Collections.Generic;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Interfaces
{
    public interface IPersonalizationProvider
    {
        List<PersonalizedTile> GetPersonalizedItems();

        string GetSectionTitle();

        List<PersonalizedTile> GetTrendingTiles();
    }
}
