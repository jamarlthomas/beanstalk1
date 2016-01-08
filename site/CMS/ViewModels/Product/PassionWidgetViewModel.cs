namespace CMS.Mvc.ViewModels.Product
{
    public class PassionWidgetViewModel : LeftSideBarSection
    {
        public PassionWidgetViewModel()
        {
            PassionBlock = new PassionBlockViewModel();
        }

        public PassionBlockViewModel PassionBlock { get; set; }
      
    }
}
