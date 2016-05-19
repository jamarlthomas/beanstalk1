using System.Linq;
using System.Collections.Generic;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Infrastructure.Models;
using System;
using CMS.OnlineMarketing;

namespace CMS.Mvc.Providers
{
    public class RateContentProvider : IRateContentProvider
    {
        public Guid SaveRateContent(RateContentRequest request, TreeNode rateContentParent, string yesLabel)
        {
            var rateContent = new RateContent
            {
                Title = "Rate this content",
                RatedDocument = request.guid,
                RatedContact = OnlineMarketingContext.GetCurrentContact().ContactGUID,
                IsHelpful = string.Compare(request.init, yesLabel, StringComparison.CurrentCultureIgnoreCase) == 0
            };
            rateContent.Insert(rateContentParent);
            return rateContent.DocumentGUID;
        }

        public void UpdateRateContent(RateContentCommentRequest request)
        {
            var rateContent = GetRateContent(request.id);
            rateContent.Message = request.comment;
            rateContent.Update();
        }

        public RateContent GetRateContent(Guid guid)
        {
            return ContentHelper.GetDocByGuid<RateContent>(guid);
        }

        public List<RateContent> GetRateContentItems()
        {
            return ContentHelper.GetDocs<RateContent>(RateContent.CLASS_NAME);
        }

        public List<RateContent> GetRateContentItemsByRatedDocumentAlias(string alias)
        {
            var doc = ContentHelper.GetDocByName<TreeNode>(string.Empty, alias);
            return GetRateContentItems().Where(w => w.RatedDocument == doc.DocumentGUID).ToList();
        }

    }
}
