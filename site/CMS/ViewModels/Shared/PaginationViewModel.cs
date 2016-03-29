namespace CMS.Mvc.ViewModels.Shared
{
    public class PaginationViewModel
    {
        public string BaseUrl { get; set; }
        public string PageArgName { get; set; }
        public int CurrentPage { get; set; }
        public int TotalPages { get; set; }
    }
}