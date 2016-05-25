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
                if (Parent.Parent.ClassName == SolutionBusinessUnit.CLASS_NAME)
                {
                    var rt = RouteHelper.GetRoute("Product");
                    return rt.Route
                        .Replace("{SBUName}", Parent.Parent.NodeAlias)
                        .Replace("{SolutionName}", Parent.NodeAlias)
                        .Replace("{ProductName}", NodeAlias);
                }
                else
                {
                    var rt = RouteHelper.GetRoute("SubSolution Product");
                    return rt.Route
                        .Replace("{SBUName}", Parent.Parent.Parent.NodeAlias)
                        .Replace("{SolutionName}", Parent.Parent.NodeAlias)
                        .Replace("{SubSolution}", Parent.NodeAlias)
                        .Replace("{ProductName}", NodeAlias);
                }
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
