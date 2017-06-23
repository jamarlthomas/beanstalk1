using CMS.Mvc.Infrastructure.Models;
using CMS.Mvc.Models.HubspotAPI;
using CMS.Mvc.Providers;
using RestSharp;
using System.Linq;
using System.Reflection;
using static CMS.Mvc.Models.HubspotAPI.ContactPost;

namespace CMS.Mvc.Helpers
{
	public class HubspotAPIHelper
	{

		private static string apiKey = "14a71afa-c9d8-483d-83ec-22f0a76f89c2";
		private static string contactPostUrl = "https://api.hubapi.com/contacts/v1/contact/?hapikey=" + apiKey;

		public static bool PostContact(UpdateContactRequest contact) {

			var client = new RestClient(contactPostUrl);
			var request = new RestRequest(Method.POST);

			request.RequestFormat = DataFormat.Json;
			request.AddBody(Convert(contact));

			IRestResponse response = client.Execute(request);

			return false;

		}

		private static ContactPost Convert(UpdateContactRequest contact) {

			ContactPost contactPost = new ContactPost();

			foreach (PropertyInfo propertyInfo in contact.GetType().GetProperties()) {
				if (propertyInfo.PropertyType == typeof(string)) {
					var name = propertyInfo.Name.ToLower();

					if (ContactPost.validProperties.Contains<string>(name)) {
						var value = propertyInfo.GetValue(contact)?.ToString();
						contactPost.properties.Add(new Property() {
							property = name,
							value = value
						});
					}

				}
			}

			contactPost.properties.Add(new Property() {
				property = "company",
				value = contact.CompanyName
			});

			CountryProvider cp = new CountryProvider();

			contactPost.properties.Add(new Property() {
				property = "country",
				value = cp.GetCountryById(contact.CountryId).CountryName
			});


			return contactPost;
		}
	}
}