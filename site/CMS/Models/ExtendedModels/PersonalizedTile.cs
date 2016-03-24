namespace CMS.DocumentEngine.Types
{
    public partial class PersonalizedTile
    {
        internal void Load(TreeNode item)
        {
            HomeImage = (string)item.GetValue("HomeImage");
            TileTitle = (string)item.GetValue("TileTitle");
            Title = (string)item.GetValue("Title");
            TileOverlayText = (string)item.GetValue("TileOverlayText");
        }
    }
}