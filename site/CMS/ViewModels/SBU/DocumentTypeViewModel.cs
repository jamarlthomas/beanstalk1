using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.SBU
{
    public class DocumentTypeViewModel
    {
        public string Title { get; set; }
        public List<DocumentViewModel> Documents { get; set; }
    }
}