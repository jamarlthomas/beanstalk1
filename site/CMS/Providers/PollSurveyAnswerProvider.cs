using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class PollSurveyAnswerProvider : IPollSurveyAnswerProvider
    {
        public List<PollSurveyAnswer> GetPollSurveyAnswers(string parentAlias)
        {
            return ContentHelper.GetDocChildrenByName<PollSurveyAnswer>(PollSurveyAnswer.CLASS_NAME, parentAlias);
        }

        public PollSurveyAnswer GetPollSurveyAnswer(string alias)
        {
            return ContentHelper.GetDocByName<PollSurveyAnswer>(PollSurveyAnswer.CLASS_NAME, alias);
        }
    }
}