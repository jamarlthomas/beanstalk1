using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;

namespace CMS.Mvc.Helpers
{
    public static class UtilsHelper
    {
        public static string GetCultureDisplayName(CultureInfo cultureInfo)
        {
            if (cultureInfo.EnglishName.StartsWith("Chinese")) return "简体中文";
            if (cultureInfo.EnglishName.StartsWith("German")) return "German";
            if (cultureInfo.EnglishName.StartsWith("Japanese")) return "日本語";
            if (cultureInfo.EnglishName.StartsWith("Russian")) return "Русский";
            if (cultureInfo.EnglishName.StartsWith("Spanish")) return "Español";
            if (cultureInfo.EnglishName.StartsWith("Portuguese")) return "Português";
            if (cultureInfo.EnglishName.StartsWith("French")) return "French";
            return "English";
        }

        public static List<Guid> ParseGuids(string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return new List<Guid>();
            }
            return input.Split(';').Select(s => Guid.Parse(s)).ToList();
        }

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

        public static DateTime ConvertToCST(DateTime input)
        {
            return TimeZoneInfo.ConvertTime(input, TimeZoneInfo.FindSystemTimeZoneById("Central Standard Time"));
        }
    }
}