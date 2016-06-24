namespace CMS.Mvc.ViewModels.SiteMap
{
    public class SiteMapHyperLink
    {
        public SiteMapHyperLink(string text, string reference)
        {
            this.Text = text;
            this.Reference = reference;
        }
        public string Text { get; set; }
        public string Reference { get; set; }
    }
}
