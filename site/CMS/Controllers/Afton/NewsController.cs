using CMS.DocumentEngine.Types;
using CMS.Mvc.ActionFilters;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.DocumentBase;
using System.Web.Mvc;


namespace CMS.Mvc.Controllers.Afton
{
    public class NewsController : DocumentBaseController
    {
        private readonly INewsProvider _newsProvider;

        public NewsController()
        {
            _newsProvider = new NewsProvider();
        }

        public NewsController(INewsProvider newsProvider)
        {
            _newsProvider = newsProvider;
        }

        [PageVisitActivity]
        public ActionResult Index(string NewsName)
        {
            var news = _newsProvider.GetNewsItem(NewsName);

            var newsViewModel = MapData<CustomNews, DocumentBaseViewModel>(news);
            newsViewModel.Abstract = news.Description;
            newsViewModel.Constant = MapData<DocumentConstant, DocumentConstantViewModel>(_documentConstantProvider.GetDocumentConstants());
            FillDownLoadButtonSection(newsViewModel, news);
            return GetBaseLayout(newsViewModel, news);
        }
    }
}