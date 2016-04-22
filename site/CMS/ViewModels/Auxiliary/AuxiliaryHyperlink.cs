namespace CMS.Mvc.ViewModels.Auxiliary
{
    public class AuxiliaryHyperlink
    {
        public AuxiliaryHyperlink(string text, string reference)
        {
            this.Text = text;
            this.Reference = reference;
        }
        public string Text { get; set; }
        public string Reference { get; set; }
    }
}
