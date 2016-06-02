namespace CMS.Mvc.Infrastructure.Models
{
    public class SelectionFilterSearchRequest : BaseSearchRequest
    {
        public string Regions { get; set; }
        public string DocumentTypesIds { get; set; }
        public string SBUId { get; set; }
        public string SolutionsIds { get; set; }
    }
}