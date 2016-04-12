using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.Infrastructure.Models
{
    public class MasterHeaderRequest
    {
        public string Title { get; set; }
        public string GlobalSearchQuery { get; set; }
    }
}