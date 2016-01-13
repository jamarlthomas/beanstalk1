using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.Providers
{
	public class ProductProvider : IProductProvider
    {
		public List<Product> GetProductItems(List<Guid> guids, string siteName)
        {
			return ContentHelper.GetDocsByGuids<Product>(guids, siteName);
		}
	}
}