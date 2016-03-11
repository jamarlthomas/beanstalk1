using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IPersonalisationProvider<T> where T : new()
    {
        List<T> GetPersonalizedItems() ;
    }
}
