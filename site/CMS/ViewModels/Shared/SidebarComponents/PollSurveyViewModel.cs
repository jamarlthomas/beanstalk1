using System;
using System.Collections.Generic;

namespace CMS.Mvc.ViewModels.Shared.SidebarComponents
{
    public class PollSurveyViewModel : SidebarItemViewModel
    {
        public string Question { get; set; }
        public DateTime Expire { get; set; }
        public string NodeAlias { get; set; }
        public int TotalVotes { get; set; }
        public string FeedbackPrompt { get; set; }
        public List<PollSurveyAnswerViewModel> Answers { get; set; }
    }
}