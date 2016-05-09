using System;
using CMS.Mvc.ViewModels.Shared;

namespace CMS.Mvc.ViewModels.Product
{
    public class RelatedProductCardViewModel : BaseLoadViewModel
    {

        public string ImageUrl { get; set; }
        public string Header { get; set; }
        public string Text { get; set; }
        public string SubHeader { get; set; }
        public string Reference { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }

        protected override void Load()
        { }

    }
}
