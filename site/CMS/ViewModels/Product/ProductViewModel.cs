using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.Product
{
    public class ProductViewModel
    {
        public string Title { get; set; }
        //public string Description { get; set; }
        public string Copy { get; set; }
        public List<string> Benefits { get; set; }
        public string Dosage { get; set; }
        public string Characteristics { get; set; }
        public string Approvals { get; set; }
        public string HandlingInformation { get; set; }
        public string Comparison { get; set; }
        public string DescriptionFirst { get; set; }
        public string DescriptionSecond { get; set; }
    }
}
