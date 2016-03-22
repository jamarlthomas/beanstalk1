using System.Collections.Generic;
using CMS.DocumentEngine;

namespace CMS.Mvc.Interfaces
{
    public interface IPersonalisationProvider<T> where T : TreeNode, new()
    {
        List<T> GetPersonalizedItems();
    }
}
