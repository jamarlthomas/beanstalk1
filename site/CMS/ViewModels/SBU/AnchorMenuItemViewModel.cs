using System;

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