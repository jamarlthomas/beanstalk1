using CMS.DocumentEngine;
using System;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Infrastructure.Models;
using System.Collections.Generic;

namespace CMS.Mvc.Interfaces
{
    public interface IRateContentProvider
    {
        Guid SaveRateContent(RateContentRequest request, TreeNode rateContentParent, string yesLabel);
        void UpdateRateContent(RateContentCommentRequest request);
        RateContent GetRateContent(Guid guid);
        List<RateContent> GetRateContentItems();
        List<RateContent> GetRateContentItemsByRatedDocumentAlias(string alias);
    }
}
