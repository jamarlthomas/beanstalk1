namespace CMS.Mvc.Infrastructure.Models
{
    public class NewsAndEventsRequest : BaseNewsEventsBlogRequest
    {
        public string Category { get; set; }
        public string DateFilter { get; set; }
    }
}