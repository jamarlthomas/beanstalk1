using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Interfaces
{
    public interface IProductProvider
    {
        Product GetProduct(string alias);
    }
}
