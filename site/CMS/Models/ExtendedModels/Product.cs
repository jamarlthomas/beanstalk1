using System;

namespace CMS.DocumentEngine.Types
{
    public partial class Product
    {
        public override string DocumentNamePath
        {
            get
            {
                return string.Format("/Product/Index/{0}", this.NodeAlias);
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
