using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Membership;
using CMS.Localization;
using CMS.DataEngine;
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
            if ( !news.IsPublished )
            {
                if ( DocumentSecurityHelper.IsAuthorizedPerDocument( news, NodePermissionsEnum.Read, true, LocalizationContext.CurrentCulture.CultureCode, MembershipContext.AuthenticatedUser ) != AuthorizationResultEnum.Allowed )
                {
                    return Redirect( "~/cmspages/logon.aspx" + "?ReturnUrl=" + Request.Path );
                }
            }
            var newsViewModel = MapData<CustomNews, DocumentBaseViewModel>(news);
            newsViewModel.Abstract = news.Description;
            newsViewModel.Constant = MapData<DocumentConstant, DocumentConstantViewModel>(_documentConstantProvider.GetDocumentConstants());
            //FillDownLoadButtonSection(newsViewModel, news);
            return GetBaseLayout(newsViewModel, news);
        }
    }
}