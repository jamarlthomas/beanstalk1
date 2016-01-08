using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;

namespace CMS.Mvc.Helpers
{
	public static class StringToGuidsConvertHelper
	{
		public static List<Guid> ParseGuids(string input)
		{
			return input.Split(';').Select(s => Guid.Parse(s)).ToList();
		}
	}
}