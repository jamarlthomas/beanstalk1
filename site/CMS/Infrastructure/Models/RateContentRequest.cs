using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.Infrastructure.Models
{
    public class RateContentRequest
    {
        public string init { get; set; }
        public Guid documentGuid { get; set; }
    }
}