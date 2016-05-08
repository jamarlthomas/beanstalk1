using System;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;

namespace CMS.DocumentEngine.Types
{
    public partial class Product : IRoutedModel
    {
        public string DocumentRoutePath
        {
            get
            {
                var rt = RouteHelper.GetRoute("Product");
                return (rt != null)
                    ? rt.Route.Replace("{ProductName}", NodeAlias)
                        .Replace("{SolutionName}", Parent.NodeAlias)
                        .Replace("{SBUName}", Parent.Parent.NodeAlias)
                    : string.Format("/Product/Index/{0}", this.NodeAlias);
            }
        }

        public DateTime DocumentCreatedWhen
        {
            get
            {
                return (DateTime)GetValue("DocumentCreatedWhen");
            }
        }
        
    }
}
