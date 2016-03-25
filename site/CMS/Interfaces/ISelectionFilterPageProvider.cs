﻿using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.ViewModels.Shared;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
	public interface ISelectionFilterPageProvider
    {
        SelectionFilterPage GetSelectionFilterPage(string name);
        SelectionFilterPage GetChildSelectionFilterPage(string parentName);
		List<BreadCrumbLinkItemViewModel> GetBreadcrumb(string name);
		TreeNode GetSelectionFilterPageParent(string name);
    }
}
