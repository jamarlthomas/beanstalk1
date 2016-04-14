using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using CMS.DocumentEngine;
using CMS.DocumentEngine.Types;
using CMS.Mvc.Interfaces;
using CMS.Mvc.Providers;
using CMS.Mvc.ViewModels.Shared.SidebarComponents;

namespace CMS.Mvc.Controllers.Afton
{
    public class SidebarPageController : BaseController
    {
        protected readonly ILeftNavigationProvider _leftNavigationProvider;
        protected readonly IPollSurveyAnswerProvider _pollSurveyAnswerProvider;
        protected readonly ISidebarProvider _sidebarProvider;
        protected readonly ICountryProvider _countryProvider;

        public SidebarPageController()
        {
            _sidebarProvider = new SidebarProvider();
            _pollSurveyAnswerProvider = new PollSurveyAnswerProvider();
            _leftNavigationProvider = new LeftNavigationProvider();
            _countryProvider = new CountryProvider();
        }

        public JsonResult SubmitEmail(string email)
        {
            //todo save emails
            return new JsonResult();
        }

        [HttpPost]
        public JsonResult PollSurveySubmit(string answerAlias, string pollSurveyAlias)
        {
            var answer = _pollSurveyAnswerProvider.GetPollSurveyAnswer(answerAlias);
            answer.Vote++;
            answer.Update();
            var answers = _pollSurveyAnswerProvider.GetPollSurveyAnswers(pollSurveyAlias);
            var totalVotes = answers.Sum(s => s.Vote);
            return Json(answers.Select(s => new PollSurveySubmitViewModel
            {
                Title = s.Title,
                VotesPercentage = 100d * s.Vote / totalVotes
            }));
        }

        protected ArrayList MapSidebar(List<TreeNode> nodes, TreeNode baseNode = null)
        {
            var list = new ArrayList();
            nodes.ForEach(item => list.Add(ConvertSideBarComponent(item, baseNode)));
            return list;
        }

        private SidebarItemViewModel ConvertSideBarComponent(TreeNode item, TreeNode baseNode)
        {
            switch (item.ClassName)
            {
                case ContactUs.CLASS_NAME:
                    {
                        return new ContactUsViewModel(item, _countryProvider.GetCountries());
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
                case DocumentSidebarComponent.CLASS_NAME:
                    {
                        return new DocumentsWidgetViewModel(item);
                    }
                case PollSurvey.CLASS_NAME:
                    {
                        var pollSurvey = MapData<PollSurvey, PollSurveyViewModel>((PollSurvey)item);
                        var answers = _pollSurveyAnswerProvider.GetPollSurveyAnswers(item.NodeAlias);
                        pollSurvey.Answers = MapData<PollSurveyAnswer, PollSurveyAnswerViewModel>(answers);
                        pollSurvey.TotalVotes = answers.Sum(s => s.Vote);
                        return pollSurvey;
                    }
                case LeftNavigation.CLASS_NAME:
                    {
                        return new LeftNavigationViewModel
                        {
                            ClassName = item.ClassName,
                            Title = baseNode.GetStringValue("Title", baseNode.NodeName),
                            NavItems = _leftNavigationProvider.GetNavItems(baseNode.NodeAliasPath)
                                .Select(node =>
                                {
                                    var model = GetLeftNavItemViewModel(node);
                                    model.SubMenu = node.Children.Select(GetLeftNavItemViewModel);
                                    return model;
                                })
                        };
                    }
                default:
                    {
                        return null;
                    }
            }
        }

        private LeftNavigationItemViewModel GetLeftNavItemViewModel(TreeNode node)
        {
            return new LeftNavigationItemViewModel
            {
                Title = node.GetStringValue("Title", node.NodeName),
                Link = node.DocumentNamePath
            };
        }
    }
}