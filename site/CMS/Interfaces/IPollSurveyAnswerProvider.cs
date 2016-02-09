using System.Collections.Generic;
using CMS.DocumentEngine.Types;

namespace CMS.Mvc.Interfaces
{
    public interface IPollSurveyAnswerProvider
    {
        List<PollSurveyAnswer> GetPollSurveyAnswers(string parentAlias);
    }
}