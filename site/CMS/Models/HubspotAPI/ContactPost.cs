using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Mvc.Models.HubspotAPI
{
	public class ContactPost
	{

		public List<Property> properties = new List<Property>();
		public static string[] validProperties = { "email", "firstname", "lastname", "website", "company", "phone", "address", "city", "state", "zip" };

		public class Property
		{
			public string property { get; set; }
			public string value { get; set; }
		}


	}
}