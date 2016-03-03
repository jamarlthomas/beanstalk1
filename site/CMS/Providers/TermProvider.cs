using System.Collections.Generic;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System;
using System.Linq;
using System.Web;

namespace CMS.Mvc.Providers
{
    public class TermProvider : ITermProvider
    {
        public List<Term> GetTerms(string parentAlias)
        {
            return ContentHelper.GetDocChildrenByName<Term>(Term.CLASS_NAME, parentAlias);
        }
    }
}