using CMS.DocumentEngine.Types;
using CMS.Mvc.Helpers;
using CMS.Mvc.Interfaces;
using System.Collections.Generic;

namespace CMS.Mvc.Providers
{
    public class HomeProvider : IHomeProvider
    {
        public Home GetHomePage()
        {
            return ContentHelper.GetDoc<Home>(Home.CLASS_NAME);
        }
    }
}