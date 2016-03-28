using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.Infrastructure.Models
{
    public class BaseSearchRequest
    {
        public string SortOrder { get; set; }
        public int? PageNumber { get; set; }
        public string Query { get; set; }
        public string IndexName { get; set; }
        public int RecordsOnPage { get; set; }
        public string ClassNames { get; set; }
        public string AdditiveQuery { get; set; }
    }
}