using System.Linq;
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
            return string.IsNullOrEmpty(name) ?
                ContentHelper.GetDoc<SelectionFilterPage>(SelectionFilterPage.CLASS_NAME, f => !(f.Parent is Solution) && !(f.Parent is SolutionBusinessUnit)) : 
                ContentHelper.GetDocByName<SelectionFilterPage>(SelectionFilterPage.CLASS_NAME, name);
        }

        public SelectionFilterPage GetDefaultSelectionFilterPage()
        {
            return GetSelectionFilterPage(null);
        }

        public SelectionFilterPage GetChildSelectionFilterPage(string parentName)
        {
            return ContentHelper.GetDocChildrenByName<SelectionFilterPage>(SelectionFilterPage.CLASS_NAME, parentName).FirstOrDefault();
        }
    }
}