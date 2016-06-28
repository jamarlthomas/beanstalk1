using System.Collections.Generic;
using System.Linq;
namespace CMS.Mvc.ViewModels.SiteMap
{
    public class SiteMapHyperLink
    {
        public SiteMapHyperLink(string text, string reference, IEnumerable<SiteMapHyperLink> children)
        {
            this.Text = text;
            this.Reference = reference;
            if (children != null)
            {
                this.Children = children.ToList();
            }
        }
        public string Text { get; set; }
        public string Reference { get; set; }
        public List<SiteMapHyperLink> Children { get; set; }
    }
}
