using System;
using System.Web;

namespace CMS.Mvc.ViewModels.Product
{
    public class InsightsAndResourcesCard
    {
        public string Reference { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public HtmlString Header { get; set; }
        public HtmlString Summary { get; set; }
        public string ImageUrl { get; set; }
    }
}
