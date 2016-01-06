using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Web;

namespace CMS.Mvc.Helpers
{
	public static class RegionsHelper
    {
		public static List<string> GetRegions()
        {
			return new List<string>
			{
				"Development",
				"Network Administration",
				"Programming",
				"Technologies"
			};
        }
    }
}