﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.Infrastructure.Models
{
    public class RateContentCommentRequest
    {
        public Guid id { get; set; }
        public string comment { get; set; }
    }
}