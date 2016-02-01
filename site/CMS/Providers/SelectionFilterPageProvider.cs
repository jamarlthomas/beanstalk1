using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
	public class SelectionFilterPageProvider : ISelectionFilterPageProvider
    {
        public SelectionFilterPage GetSelectionFilterPage(string name)
        {
			return ContentHelper.GetDocByName<SelectionFilterPage>(SelectionFilterPage.CLASS_NAME, name);
        }

		public TreeNode GetSelectionFilterPageParent(string name)
		{
			return ContentHelper.GetDocByName<SelectionFilterPage>(SelectionFilterPage.CLASS_NAME, name).Parent;
		}

		public List<BreadCrumbLinkItemViewModel> GetBreadcrumb(string name)
		{
			return ContentHelper.GetBreadcrumb<SelectionFilterPage>(SelectionFilterPage.CLASS_NAME, name);
		}
    }
}