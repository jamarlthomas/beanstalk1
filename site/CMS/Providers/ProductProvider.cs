using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.Mvc.Providers
{
    public class ProductProvider : IProductProvider
    {
        public Product GetProduct(string alias)
        {
            return ContentHelper.GetDocByName<Product>(Product.CLASS_NAME, alias);
        }
    }
}
