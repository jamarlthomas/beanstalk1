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
        protected readonly IContactProvider _contactProvider;

        public SidebarPageController()
        {
            _sidebarProvider = new SidebarProvider();
            _pollSurveyAnswerProvider = new PollSurveyAnswerProvider();
            _leftNavigationProvider = new LeftNavigationProvider();
            _countryProvider = new CountryProvider();
            _contactProvider = new ContactProvider();
        }

        public JsonResult SubmitEmail(string email)
        {
            bool result = _contactProvider.Subscribe(email);
            return Json(result,JsonRequestBehavior.AllowGet);
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
                        string aliasPath = null;
                        string aliasTitle = null;
                        if (baseNode.NodeClassName == Solution.CLASS_NAME && baseNode.NodeLevel < 4||
                            (baseNode.NodeClassName == GenericPage.CLASS_NAME && baseNode.NodeLevel == 3))
                        {
                            aliasPath = baseNode.Parent.NodeAliasPath;
                            aliasTitle = baseNode.Parent.GetStringValue("Title", baseNode.Parent.NodeName);
                        }
                        else if (baseNode.NodeClassName == Product.CLASS_NAME || (baseNode.NodeClassName == Solution.CLASS_NAME && baseNode.NodeLevel >= 4) ||
                            (baseNode.NodeClassName == GenericPage.CLASS_NAME && baseNode.NodeLevel == 4))
                        {
                            aliasPath = baseNode.Parent.Parent.NodeAliasPath;
                            aliasTitle = baseNode.Parent.Parent.GetStringValue("Title", baseNode.Parent.Parent.NodeName);
                        }
                        else if ((baseNode.NodeClassName == GenericPage.CLASS_NAME && baseNode.NodeLevel == 5))
                        {
                            aliasPath = baseNode.Parent.Parent.Parent.NodeAliasPath;
                            aliasTitle = baseNode.Parent.Parent.Parent.GetStringValue("Title", baseNode.Parent.Parent.NodeName);
                        }
                        else if (baseNode.Parent.NodeClassName == DocumentType.CLASS_NAME) 
                        {
                            aliasPath = baseNode.Parent.NodeAliasPath;
                            aliasTitle = baseNode.Parent.GetStringValue( "Title", baseNode.Parent.Parent.NodeName );
                        }
                        else if ( baseNode.Parent.Parent.NodeClassName == DocumentType.CLASS_NAME )
                        {
                            aliasPath = baseNode.Parent.Parent.NodeAliasPath;
                            aliasTitle = baseNode.Parent.Parent.GetStringValue( "Title", baseNode.Parent.Parent.Parent.NodeName );
                        }
                        else {
                            aliasPath = baseNode.NodeAliasPath;
                            aliasTitle = baseNode.GetStringValue("Title", baseNode.NodeName);
                        }

                        return new LeftNavigationViewModel
                        {
                            ClassName = item.ClassName,
                            Title = aliasTitle,
                            NavItems = _leftNavigationProvider.GetNavItems(aliasPath)
                                .Select(node =>
                                {
                                    var model = GetLeftNavItemViewModel(node);
                                    if (baseNode.Parent.NodeAliasPath==node.NodeAliasPath||(node.Children.Where(x=>(x.NodeClassName==Solution.CLASS_NAME||x.NodeClassName==GenericPage.CLASS_NAME||x.NodeClassName==Document.CLASS_NAME)).Count()>0 && baseNode.NodeAliasPath==node.NodeAliasPath))
                                    {
                                        model.SubMenu = node.Children.Select(GetLeftNavItemViewModel);
                                    }
                                    return model;
                                }),
                            HasHero = !string.IsNullOrEmpty(baseNode.GetStringValue("HeroImage",""))
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
                Link =  ((node as IRoutedModel) != null) ? (node as IRoutedModel).DocumentRoutePath : node.DocumentNamePath,
                NavigationIcon = node.GetStringValue("NavigationIcon",null)
            };
        }

      
    }
}