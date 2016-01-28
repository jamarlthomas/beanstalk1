using System.Collections;
using System.Collections.Generic;
using System.Web.Mvc;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;
using CMS.Mvc.Interfaces;
using Newtonsoft.Json;

namespace CMS.Mvc.Controllers.Afton
{
    public class SidebarPageController : BaseController
    {
        protected readonly ISidebarProvider _sidebarProvider;
        protected readonly IPollSurveyAnswerProvider _pollSurveyAnswerProvider;
        
        public SidebarPageController()
        {
            _sidebarProvider = new SidebarProvider();
            _pollSurveyAnswerProvider = new PollSurveyAnswerProvider();
        }

        public JsonResult SubmitEmail(string email)
        {
            //todo save emails
            return new JsonResult();
        }

        protected ArrayList MapSidebar(List<TreeNode> nodes)
        {
            var list = new ArrayList();
            nodes.ForEach(item => list.Add(ConvertSideBarComponent(item)));
            return list;
        }

        private SidebarItemViewModel ConvertSideBarComponent(TreeNode item)
        {
            switch (item.ClassName)
            {
                case ContactUs.CLASS_NAME:
                    {
                        return new ContactUsViewModel(item, _sidebarProvider.GetCountries());
                    }
                case StayInformed.CLASS_NAME:
                    {
                        return new StayInformedViewModel(item);
                    }
                case InsightsAndResourcesWidget.CLASS_NAME:
                    {
                        return new InsightsAndResourcesWidgetViewModel(item);
                    }
                case GenericSidebarBlock.CLASS_NAME:
                    {
                        return new GenericSidebarBlockViewModel(item);
                    }
                case PollSurvey.CLASS_NAME:
                    {
                        return MapData<PollSurvey, PollSurveyViewModel>((PollSurvey) item);
                    }
                default:
                    {
                        return null;
                    }
            }
        }

        
    }
}
