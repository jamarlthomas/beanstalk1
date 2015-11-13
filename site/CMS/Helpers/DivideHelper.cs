using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace CMS.Mvc.Helpers
{
    public static class DivideHelper
    {
        public static string[] SeparateText(string text)
        {
            if (string.IsNullOrEmpty(text)) return null;
            var paragraphs = text.Split(new string[] { "\r\n" }, StringSplitOptions.None);
            var LeftPart = new StringBuilder("");
            var index = 0;
            while (LeftPart.Length < text.Length / 2)
            {
                LeftPart.Append(paragraphs[index++]);
            }
            var RightPart = new StringBuilder("");
            while (index < paragraphs.Length)
            {
                RightPart.Append(paragraphs[index++]);
            }
            return new string[] { LeftPart.ToString(), RightPart.ToString() };
        }
    }
}