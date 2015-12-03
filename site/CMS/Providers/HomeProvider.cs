using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class HomeProvider : IHomeProvider
    {
        public List<Home> GetHomeItems()
        {
            return ContentHelper.GetDocs<Home>(Home.CLASS_NAME);
        }
    }
}