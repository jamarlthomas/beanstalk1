using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.ViewModels.SBU
{
    public class AnchorMenuItemViewModel
    {
        public AnchorMenuItemViewModel()
        {
            Id = Guid.NewGuid();
        }
        public string Title { get; set; }
        public Guid Id { get; set; }
    }
}