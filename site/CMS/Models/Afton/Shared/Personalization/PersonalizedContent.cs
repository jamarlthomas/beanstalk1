using System;
using CMS.DocumentEngine;

namespace CMS.Mvc.Models.Afton.Shared.Personalization
{
    public class PersonalizedContent<T> where T: TreeNode, new()
    {
        public T Item;
        public DateTime PostedDate { get; set; }
        public int ViewsCount { get; set; }
        public DateTime? LastViewDate { get; set; }
        public PersonalizedContent(T item)
        {
            Item = item;
        }

        public double Relevance
        {
            get { return 100*(1 - IndexSum); }
        }

        public double IndexSum { get; set; }



        public int CurrentPersonaWeight { get; set; }
    }
}
