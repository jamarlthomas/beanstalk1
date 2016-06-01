using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Web;
using CMS.DocumentEngine.Types;
using CMS.Helpers;
using CMS.Localization;
using CultureInfo = System.Globalization.CultureInfo;

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
            if (cultureInfo.EnglishName.StartsWith("French")) return "Français";
            return "English";
        }

        public static List<Guid> ParseGuids(string input)
        {
            if (string.IsNullOrEmpty(input))
            {
                return new List<Guid>();
            }
            return input.Split(';').Select(s =>
            {
                Guid result;
                Guid.TryParse(s, out result);
                return result;
            }).ToList();
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

        public static string GetBaseUrlWithoutIntParam(string baseUrl, string paramName)
        {
            var url = new Regex(string.Format(@"&*{0}=\d+", paramName)).Replace(baseUrl, string.Empty);
            return url.Contains('?') ? url : string.Format("{0}?", url);
        }
        public static HtmlString ToHtmlString(string text)
        {
            return new HtmlString(HTMLHelper.ResolveUrls(text, "/"));
        }
        static public string Ellipsis(string text, int length)
        {
            if (text.Length <= length) return text;
            int pos = text.IndexOf(" ", length);
            if (pos >= 0)
                return text.Substring(0, pos) + "...";
            return text;
        }


        public static string GetLocalizedString(string resourceName)
        {
            var value = ResHelper.GetString(resourceName, LocalizationContext.CurrentCulture.CultureCode,
                false);
            return value;
        }
    }
}
