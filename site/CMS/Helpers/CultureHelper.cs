using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;

namespace CMS.Mvc.Helpers
{
	public static class CultureHelper
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
    }
}