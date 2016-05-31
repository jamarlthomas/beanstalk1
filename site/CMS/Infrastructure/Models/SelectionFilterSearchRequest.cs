namespace CMS.Mvc.Infrastructure.Models
{
    public class SelectionFilterSearchRequest : BaseSearchRequest
    {
        public string Regions { get; set; }
        public string DocumentTypesIds { get; set; }
        public string SBUId { get; set; }
        public string SolutionsIds { get; set; }

        // Set these to true to indicate no filter given for the respective field
        public bool IsNullRegion { get; set; }
        public bool IsNullDocumentType{ get; set; }
        public bool IsNullSBU { get; set; }
        public bool IsNullSolutionId { get; set; }
    }
}