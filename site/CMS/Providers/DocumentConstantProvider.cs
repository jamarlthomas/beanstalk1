using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class DocumentConstantProvider : IDocumentConstantProvider
    {
        public List<DocumentConstant> GetDocumentConstants()
        {
            return ContentHelper.GetDocs<DocumentConstant>(DocumentConstant.CLASS_NAME);
        }
    }
}