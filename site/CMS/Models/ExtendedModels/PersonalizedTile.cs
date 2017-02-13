using CMS.Mvc.Interfaces;
namespace CMS.DocumentEngine.Types
{
    public partial class PersonalizedTile
    {
        public TreeNode Item { get; set; }
        public string Reference { get; set; }
        internal void Load(TreeNode item)
        {
            var test = DocumentHelper.GetDocument( item.NodeID,Localization.LocalizationContext.PreferredCultureCode ,item.TreeProvider );
            //Item = item;
            if ( test != null && test.IsPublished==true)
            {
                Item = test;
            }
            else
            {
                Item = DocumentHelper.GetDocument( item.NodeID, "en-US", item.TreeProvider );
                if(Item==null)
                {
                    Item = item;
                }
            }
            HomeImage = (string)Item.GetValue("HomeImage");
            TileTitle = (string)Item.GetValue("TileTitle");
            Title = (string)Item.GetValue("Title");
            Description = (string)Item.GetValue("Description");
            Reference = ((Item as IRoutedModel) != null) ? ((IRoutedModel) Item).DocumentRoutePath : Item.DocumentNamePath;


        }

    }
}