using CMS.DocumentEngine.Types;
using System;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
	public interface IProductProvider
    {
		List<Product> GetProductItems(List<Guid> guids, string siteName);
    }
}
