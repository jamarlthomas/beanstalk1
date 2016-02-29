using CMS.DocumentEngine;

namespace CMS.Mvc.ViewModels.Shared
{
    public abstract class BaseLoadViewModel
    {
        protected TreeNode item;

        protected BaseLoadViewModel(TreeNode item)
        {
            this.item = item;
            Load();
        }

        protected BaseLoadViewModel()
        {}

        protected abstract void Load();


    }
}
