using System.Collections.Generic;
using System.Linq;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class ContactUsViewModel : SidebarItemViewModel
    {
        
        public List<CountryViewModel> Countries { get; set; }
        public ContactUsViewModel(TreeNode item) : base(item)
        {}

        public ContactUsViewModel(TreeNode item, IEnumerable<Country> countries): base(item)
        {
            Countries = countries.Select(country => new CountryViewModel() { CountryName = country.NodeName }).ToList();
        }

        public List<RegionViewModel> Regions { get; set; }
        public string Copy { get; set; }

        protected override void Load()
        {
            base.Load();
            Copy = ((ContactUs) item).Copy;
        }

        
    }
}
