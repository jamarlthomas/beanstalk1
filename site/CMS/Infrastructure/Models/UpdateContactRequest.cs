namespace CMS.Mvc.Infrastructure.Models
{
    public class UpdateContactRequest
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string CompanyName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int CountryId { get; set; }
        public string CountryName { get; set; }
        public string Note { get; set; }
        public string IsSubscribed { get; set; }
        public string SubjectName { get; set; }
        public string Body { get; set; }
    }
}