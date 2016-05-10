using System.Collections.Generic;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.ViewModels.SBU
{
	public class DocumentTypeViewModel
	{
		public string Title { get; set; }
		public List<DocumentViewModel> Documents { get; set; }
        public List<ProductViewModel> Products { get; set; }
	}
}