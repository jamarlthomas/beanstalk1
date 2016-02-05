using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.ViewModels.Product
{
    public class RelatedProductCardViewModel : LinkViewModel
    {
        public string ImageUrl { get; set; }
        public string Header { get; set; }
        public string Text { get; set; }
        public string SubHeader { get; set; }

        internal static string GetUrl(DocumentEngine.Types.Product product)
        {
            return string.Format("/Product/Index/{0}", product.NodeAlias);
            //return string.Format("/SBU/{0}/{1}/{2}", product.Parent.Parent.NodeAlias, product.Parent.NodeAlias,
            //    product.NodeAlias);
        }
    }
}
