namespace CMS.Mvc.Infrastructure.Models
{
    public class BlogsRequest : BaseNewsEventsBlogRequest
    {
        public string Category { get; set; }
        public string Author { get; set; }
    }
}