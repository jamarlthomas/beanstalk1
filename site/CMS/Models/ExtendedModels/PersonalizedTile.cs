using CMS.Mvc.Interfaces;
namespace CMS.DocumentEngine.Types
{
    public partial class PersonalizedTile
    {
        public TreeNode Item { get; set; }
        public string Reference { get; set; }
        internal void Load(TreeNode item)
        {
            Item = item;
            HomeImage = (string)item.GetValue("HomeImage");
            TileTitle = (string)item.GetValue("TileTitle");
            Title = (string)item.GetValue("Title");
            Description = (string)item.GetValue("Description");
            Reference = ((item as IRoutedModel) != null) ? ((IRoutedModel) item).DocumentRoutePath : item.DocumentNamePath;
        }

    }
}